import Prisma from '@libs/Prisma'
import ErrorServer from '@controllers/ErrorServer.controller'

/**
 * @class Raffle
 * @extends Model
 * @description Raffle model class. */
export default class Account {
    /**
     * @private
     * @description Prisma ORM definition handler library. */
    #client

    /**
     * @description Generate link to Raffle model. */
    constructor() {
        this.#client = new Prisma('account').client
    }

    /**
     * @description Returns an account if there is any.
     * @param query Query request object.
     * @param options Options request object.
     * @throws SERVER, id parameter is mandatory. */
    findUnique({ id, email, liked, shared }, options = {}) {
        if (!id && !email)
            throw new ErrorServer('SERVER', 'required mandatory parameters')
        const { include } = options
        return this.#client.findUnique({
            where: {
                ...(id && { id }),
                ...(email && { email }),
            },
            ...(liked?.id && {
                include: {
                    liked: {
                        where: { id: liked.id },
                    },
                },
            }),
            ...(shared?.id && {
                include: {
                    shared: {
                        where: { id: shared.id },
                    },
                },
            }),
            ...(include && { include: { ...include } }),
        })
    }

    /**
     * @description
     * Update an account.
     * Connection/Disconnection with raffle to share or liked.
     * @param query Query request object.
     * @param payload Payload request object.
     * @param options Options request object.
     * @throws SERVER, id parameter is mandatory.
     * @throws SERVER, payload parameter is mandatory.
     * @returns Result set after update.*/
    update({ id }, payload, options = {}) {
        if (!id) throw new ErrorServer('SERVER', 'id parameter is mandatory')
        if (!Object.keys(payload).length)
            throw new ErrorServer('SERVER', 'payload parameter is mandatory')
        const { include } = options
        return this.#client.update({
            where: { id },
            data: payload,
            ...(include && { include: { ...include } }),
        })
    }

    /**
     * @description
     * Link an account with a raffle.
     * Connection with raffle to share.
     * @param query Query request object.
     * @param payload Payload request object.
     * @throws SERVER, id parameter is mandatory.
     * @throws SERVER, payload parameter is mandatory.
     * @returns Result set after update. */
    connect({ id }, { likedRaffleId, sharedRaffleId }) {
        if (!id) throw new ErrorServer('SERVER', 'id parameter is mandatory')
        if (!likedRaffleId && !sharedRaffleId)
            throw new ErrorServer('SERVER', 'payload parameter is mandatory')

        return this.update(
            { id },
            {
                ...(likedRaffleId && {
                    liked: { connect: { id: likedRaffleId } },
                }),
                ...(sharedRaffleId && {
                    shared: { connect: { id: sharedRaffleId } },
                }),
            },
            {
                ...(likedRaffleId && { include: { liked: true } }),
                ...(sharedRaffleId && { include: { shared: true } }),
            }
        )
    }

    /**
     * @description
     * Unlink an account with a raffle.
     * @param query Query request object.
     * @param payload Payload request object.
     * @throws SERVER, id parameter is mandatory.
     * @throws SERVER, likedRaffleId parameter is mandatory.
     * @returns Result set after update. */
    disconnect({ id }, { likedRaffleId }) {
        if (!id) throw new ErrorServer('SERVER', 'id parameter is mandatory')
        if (!likedRaffleId)
            throw new ErrorServer(
                'SERVER',
                'likedRaffleId parameter is mandatory'
            )
        return this.update(
            { id },
            {
                ...(likedRaffleId && {
                    liked: { disconnect: { id: likedRaffleId } },
                }),
            },
            {
                ...(likedRaffleId && { include: { liked: true } }),
            }
        )
    }
}
