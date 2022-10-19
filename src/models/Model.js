import Prisma from '@libs/Prisma'
import ErrorServer from '@controllers/ErrorServer.controller'

/**
 * @class Model
 * @description Base class for all models. */
export default class Model {
    /**
     * @private
     * @description Prisma ORM definition handler library. */
    #client

    /**
     * @description Generate link to Prisma model.
     * @param {string} model Model name.
     * @throws SERVER Prisma level errors. */
    constructor(model) {
        try {
            this.#client = new Prisma(model)
        } catch (error) {
            throw new ErrorServer('SERVER', error.message)
        }
    }

    /**
     * @description Find all registers in model. */
    findMany(params) {
        return this.#client.findMany(params)
    }
}
