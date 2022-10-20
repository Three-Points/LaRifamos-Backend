import Controller from '@controllers/Raffle.controller'
import Prisma from '@libs/Prisma'
import { raffleExpect } from './raffle.expect'
import { raffleMock } from './raffle.mock'

const _findManyMock = jest.spyOn(Prisma.prototype, 'findMany')

describe('Raffle Controller', () => {
    const controller = new Controller()
    test('should to have a valid response', async () => {
        _findManyMock.mockImplementationOnce(() =>
            Promise.resolve([raffleMock])
        )
        const raffles = await controller.findMany({})
        expect(raffles).toEqual(expect.arrayContaining([raffleExpect]))
    })
    test('should to have a valid response to apply categories filter', async () => {
        _findManyMock.mockImplementationOnce(() =>
            Promise.resolve([raffleMock])
        )
        const raffles = await controller.findMany({ categories: ['event'] })
        expect(raffles).toEqual(expect.arrayContaining([raffleExpect]))
        expect(raffles[0].category).toBe('EVENT')
    })
    test('should to have a valid response to apply name filter', async () => {
        _findManyMock.mockImplementationOnce(() =>
            Promise.resolve([raffleMock])
        )
        const raffles = await controller.findMany({ name: 'Green' })
        expect(raffles).toEqual(expect.arrayContaining([raffleExpect]))
        expect(raffles[0].name).toBe('Green Card')
    })
    test('should to have a valid response to apply state filter', async () => {
        _findManyMock.mockImplementationOnce(() =>
            Promise.resolve([raffleMock])
        )
        const raffles = await controller.findMany({ state: 'FINISHED' })
        expect(raffles).toEqual(expect.arrayContaining([raffleExpect]))
        expect(raffles[0].state).toBe('FINISHED')
    })
    test('should to have a valid response to apply type filter', async () => {
        _findManyMock.mockImplementationOnce(() =>
            Promise.resolve([raffleMock])
        )
        const raffles = await controller.findMany({ type: 'COMBO' })
        expect(raffles).toEqual(expect.arrayContaining([raffleExpect]))
        expect(raffles[0].type).toBe('COMBO')
    })
})
