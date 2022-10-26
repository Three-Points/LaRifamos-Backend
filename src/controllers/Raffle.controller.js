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
    //TODO Relate participants as a count
    async findMany({ categories, name, state, type }) {
        const filters = { categories, name, state, type }
        const raffles = await this.#model.findMany(filters)
        return raffles.map(({ products, ...raffle }) => {
            return {
                name: raffle.name,
                drawDate: raffle.drawDate,
                participants: 978,
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

    async findRaffleId({ input_id }) {
        const raffle = await this.#model.findUnique({ input_id: input_id })

        raffle['tickets'] = raffle['tickets'].length
        console.log(raffle)
        return raffle['id']
    }
}
