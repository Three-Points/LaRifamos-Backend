import RaffleModel from '@models/Raffle.model'

export default class Raffle {
    #model = new RaffleModel()

    /**
     * @description
     * Returns a list of raffles and its products related.
     * Filtering by:
     *  - categories, conjunction filter.
     *  - name, partial match.
     *  - state or type, exact match.
     * @param filters Filters supported on this model.
     * @returns Collection of Raffles. */
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
}
