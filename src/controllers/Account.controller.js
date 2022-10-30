import AccountModel from '@models/Account.model'
import ErrorServer from '@controllers/ErrorServer.controller'

export default class Account {
    #model = new AccountModel()

    /**
     * @description
     * Find an account.
     * If liked is provided, it will be included liked raffles.
     * @param query Query request object.
     * @param options Options request object.
     * @throws SERVER, id parameter is mandatory.
     * @throws NOT_FOUND, Account not found.
     * @returns Account, optional includes. */
    async findAccount({ id, email, liked, shared }, options = {}) {
        if (!id && !email)
            throw new ErrorServer('SERVER', 'required mandatory parameters')
        const account = await this.#model.findUnique(
            {
                id,
                email,
                liked,
                shared,
            },
            options
        )
        if (!account) throw new ErrorServer('NOT_FOUND', 'Account not found')
        const { include } = options
        return {
            id: account.id,
            name: account.name,
            email: account.email,
            password: account.password,
            ...((include?.liked || liked) && { liked: account.liked }),
            ...((include?.shared || shared) && { shared: account.shared }),
        }
    }

    /**
     * @description
     * Like/Unlike an account with a raffle as connection/disconnection.
     * Query by:
     *  - accountId, ID of account.
     * Payload by:
     *  - raffleId, ID of raffle.
     * @param query Query request object.
     * @param payload Payload request object.
     * @throws SERVER, id parameter is mandatory.
     * @throws SERVER, raffleId parameter is mandatory.
     * @throws NOT_FOUND, Account not found. */
    async rateRaffle({ accountId }, { raffleId }) {
        if (!accountId)
            throw new ErrorServer('SERVER', 'id parameter is mandatory')
        if (!raffleId)
            throw new ErrorServer('SERVER', 'raffleId parameter is mandatory')

        const { liked } = await this.findAccount({
            id: accountId,
            liked: { id: raffleId },
        })
        if (!liked?.length) {
            await this.#model.connect(
                { id: accountId },
                { likedRaffleId: raffleId }
            )
        } else {
            await this.#model.disconnect(
                { id: accountId },
                { likedRaffleId: raffleId }
            )
        }
    }

    /**
     * @description
     * To share, connect an account with a raffle.
     * Query by:
     *  - accountId, ID of account.
     * Payload by:
     *  - raffleId, ID of raffle.
     * @param query Query request object.
     * @param payload Payload request object.
     * @throws SERVER, id parameter is mandatory.
     * @throws SERVER, raffleId parameter is mandatory.
     * @throws NOT_FOUND, Account not found. */
    async shareRaffle({ accountId }, { raffleId }) {
        if (!accountId)
            throw new ErrorServer('SERVER', 'id parameter is mandatory')
        if (!raffleId)
            throw new ErrorServer('SERVER', 'raffleId parameter is mandatory')

        const { shared } = await this.findAccount({
            id: accountId,
            shared: { id: raffleId },
        })
        if (!shared?.length) {
            await this.#model.connect(
                { id: accountId },
                { sharedRaffleId: raffleId }
            )
        }
    }

    /**
     * @description
     * Returns a list of raffles liked by an account.
     * Query by:
     *  - id, ID of account.
     *  - email, email of account.
     * @param query Query request object. */
    async findLikedRaffles({ id, email }) {
        const { liked } = await this.findAccount(
            { id, email },
            { include: { liked: true } }
        )
        return liked
    }
}
