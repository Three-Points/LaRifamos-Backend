import { PrismaClient } from '@prisma/client'
import { complete, fail } from '@utils/logger.util'

import products from '@mocks/products.mock'

const _prisma = new PrismaClient()

const _createBatch = (model, collection) =>
    Promise.all(
        collection.map(async (item) => {
            await _prisma[model].create({ data: item })
        })
    )
        .then(() => complete(`${model} created`))
        .catch((error) => {
            fail(`${model} failed`, error.message)
        })

;(async () => {
    await _createBatch('product', products)
})().finally(async () => {
    await _prisma.$disconnect()
})
