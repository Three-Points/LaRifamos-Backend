import { PrismaClient } from '@prisma/client'
import ErrorServer from '@controllers/ErrorServer.controller'

/**
 * @class
 * @description Prisma ORM definition handler library */
export default class Prisma {
    /**
     * @private
     * @description Prisma ORM client. */
    #client = new PrismaClient()

    /**
     * @param {string} resource Model name. */
    constructor(resource) {
        this.resource = resource
    }

    /**
     * @description Singleton pattern for pool connection.
     * @throws SERVER Model not found.
     * @returns Connection to model. */
    #connect() {
        const model = Object.entries(this.#client).find(
            ([key]) => key === this.resource
        )
        if (!model)
            throw new ErrorServer('SERVER', `Model ${this.resource} not found`)
        return model[1]
    }

    /**
     * @description Find all registers in model. */
    findMany(params) {
        return this.#connect().findMany(params)
    }
}
