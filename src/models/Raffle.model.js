import Model from '@models/Model'

/**
 * @class Raffle
 * @extends Model
 * @description Raffle model class. */
export default class Raffle extends Model {
    /**
     * @description Generate link to Raffle model. */
    constructor() {
        super('raffle')
    }

    /**
     * @description
     * Returns a list of raffles and its products related.
     * @param filters Filters supported on this model.
     * @returns An array of objects. */
    findMany({ categories, name, state, type }) {
        return super.findMany({
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
}
