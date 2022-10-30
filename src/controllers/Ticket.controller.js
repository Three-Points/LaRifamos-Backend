import TicketModel from '@models/Ticket.model'
import ErrorServer from '@controllers/ErrorServer.controller'

export default class Ticket {
    #model = new TicketModel()

    /**
     * @description
     * Returns a list of tickets with its respective relation.
     * Filtering by:
     *  - account, returns all tickets related to an account.
     *  - raffle, returns all tickets related to a raffle.
     * @param filters Filters supported on this model. */
    async findTickets({ account, raffle }) {
        const filters = { account, raffle }
        const tickets = await this.#model.findMany(filters)
        return tickets.map(({ number, account, raffle }) => ({
            number,
            raffle,
            account,
        }))
    }

    /**
     * @description Find a ticket by its number.
     * @param filters Filters supported on this model. */
    async findTicket({ number }) {
        if (!number)
            throw new ErrorServer('SERVER', 'number parameter is mandatory')
        const ticket = await this.#model.findUnique({ number })
        return {
            number: ticket.number,
            account: ticket.account,
            raffle: ticket.raffle,
        }
    }

    async enrollToRaffle({ account, raffle }) {
        if (!account && !raffle)
            throw new ErrorServer('SERVER', 'required mandatory parameters')
        return this.#model.create({ account, raffle })
    }
}
