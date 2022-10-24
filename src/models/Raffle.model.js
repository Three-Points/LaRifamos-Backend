import Prisma from '@libs/Prisma'

/**
 * @class Raffle
 * @extends Model
 * @description Raffle model class. */
export default class Raffle {
    /**
     * @private
     * @description Prisma ORM definition handler library. */
    #client

    /**
     * @description Generate link to Raffle model. */
    constructor() {
        this.#client = new Prisma('raffle').client
    }

    /**
     * @description
     * Returns a list of raffles and its products related.
     * @param filters Filters supported on this model.
     * @returns Collection of Raffles. */
    findMany({ categories, name, state, type }) {
        return this.#client.findMany({
            where: {
                ...(categories && {
                    OR: categories.map((category) => ({
                        category: category.toUpperCase(),
                    })),
                }),
                ...(name && { name: { contains: name } }),
                ...(state && { state: state.toUpperCase() }),
                ...(type && { type: type.toUpperCase() }),
            },
            include: {
                products: {
                    include: {
                        images: true,
                    },
                },
            },
        })
    }


    findRaffleId({input_id}){
        return this.#client.findUnique({where:{id:input_id}})
    }




}
