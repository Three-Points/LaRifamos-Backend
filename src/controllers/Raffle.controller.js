import RaffleModel from '@models/Raffle.model'
import ErrorServer from './ErrorServer.controller'

export default class Raffle {
    #model = new RaffleModel()

    /**
     * @description
     * Returns a list of raffles and its products related.
     * Filtering by:
     *  - categories, conjunction filter.
     *  - name, partial match.
     *  - state or type, exact match.
     * @param filters Filters supported on this model. */
    async findRaffles({ categories, name, state, type }) {
        const filters = { categories, name, state, type }
        const raffles = await this.#model.findMany(filters)
        return raffles.map(({ products, tickets, ...raffle }) => {
            return {
                id: raffle.id,
                name: raffle.name,
                drawDate: raffle.drawDate,
                participants: tickets.length,
                ticketCost: raffle.ticketCost,
                state: raffle.state,
                type: raffle.type,
                category: raffle.category,
                products: products.map((product) => ({
                    images: product.images.map(({ url }) => url),
                })),
            }
        })
    }

    async findRaffleId({ id }) {
        if (Number.isNaN(id)) {
            throw new ErrorServer('SERVER', 'required mandatory parameters')
        }
        const raffle = await this.#model.findUnique({ id })

        if (!raffle) {
            throw new ErrorServer('NOT_FOUND', 'Raffle not found')
        }

        return { ...raffle, participants: raffle.tickets.length }
    }
}
