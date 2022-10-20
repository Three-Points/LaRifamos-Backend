import bcrypt from 'bcrypt'
import { PrismaClient } from '@prisma/client'
import { complete, fail } from '@utils/logger.util'

import accounts from '@mocks/accounts.mock'
import management from '@mocks/management.mock'
import raffles from '@mocks/raffles.mock'
import tickets from '@mocks/tickets.mock'

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

const _createBatchAccount = (model, collection) =>
    Promise.all(
        collection.map(async ({ password, ...item }) => {
            await _prisma[model].create({
                data: {
                    ...item,
                    password: await bcrypt.hash(password.toString(), 10),
                },
            })
        })
    )
        .then(() => complete(`${model} created`))
        .catch((error) => {
            fail(`seed failed in ${model}`, error.message)
        })

;(async () => {
    await _createBatch('raffle', raffles)
    await _createBatchAccount('management', management)
    await _createBatchAccount('account', accounts)
    await _createBatch('ticket', tickets)
})().finally(async () => {
    await _prisma.$disconnect()
})
