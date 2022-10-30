import Prisma from '@libs/Prisma'
import ErrorServer from '@controllers/ErrorServer.controller'

/**
 * @class Ticket
 * @extends Model
 * @description Ticket model class. */
export default class Ticket {
    /**
     * @private
     * @description Prisma ORM definition handler library. */
    #client

    /**
     * @description Generate link to Ticket model. */
    constructor() {
        this.#client = new Prisma('ticket').client
    }

    /**
     * @description
     * Returns a ticket if there is any.
     * Included relationship both account and raffle.
     * If number is not sent, throw SERVER error.
     * @param query Query request object.
     * @throws SERVER, number parameter is mandatory. */
    findUnique({ number }) {
        if (!number)
            throw new ErrorServer('SERVER', 'number parameter is mandatory')
        return this.#client.findUnique({
            where: { number },
            include: {
                account: true,
                raffle: true,
            },
        })
    }

    /**
     * @description
     * Returns a list of tickets.
     * If it sent account or raffle, returns a list of tickets filtered by them.
     * Included relationship both account and raffle.
     * @param filters Filters supported on this model. */
    findMany({ account, raffle }) {
        return this.#client.findMany({
            where: {
                ...(account?.id && { account: { id: account.id } }),
                ...(raffle?.id && { raffle: { id: raffle.id } }),
            },
            include: {
                ...(!account && { account: true }),
                ...(!raffle && { raffle: true }),
                ...(!account && !raffle && { account: true, raffle: true }),
            },
        })
    }

    /**
     * @description
     * Returns a list of tickets and its relationship both account and raffle.
     * @param payload Filters supported on this model. */
    //TODO
    create({ account, raffle }) {
        if (!account || !raffle)
            throw new ErrorServer('SERVER', 'required mandatory parameters')
        return this.#client.create({
            data: {
                account: { connect: { id: account.id } },
                raffle: { connect: { id: raffle.id } },
            },
        })
    }
}
