import Controller from '@controllers/Raffle.controller'
import Raffle from '@models/Raffle.model'
import { expectRaffle } from './raffle.expect'
import { mockRaffle } from './raffle.mock'

const mockFindMany = jest.spyOn(Raffle.prototype, 'findMany')

describe('Raffle Controller', () => {
    mockFindMany.mockImplementation(() => Promise.resolve([mockRaffle]))
    const controller = new Controller()
    test('should to have a valid response', async () => {
        const raffles = await controller.findMany({})
        expect(raffles).toEqual(expect.arrayContaining([expectRaffle]))
    })
    test('should to have a valid response to apply categories filter', async () => {
        const raffles = await controller.findMany({ categories: ['event'] })
        expect(raffles).toEqual(expect.arrayContaining([expectRaffle]))
        expect(raffles[0].category).toBe('EVENT')
    })
    test('should to have a valid response to apply name filter', async () => {
        const raffles = await controller.findMany({ name: 'Green' })
        expect(raffles).toEqual(expect.arrayContaining([expectRaffle]))
        expect(raffles[0].name).toBe('Green Card')
    })
    test('should to have a valid response to apply state filter', async () => {
        const raffles = await controller.findMany({ state: 'FINISHED' })
        expect(raffles).toEqual(expect.arrayContaining([expectRaffle]))
        expect(raffles[0].state).toBe('FINISHED')
    })
    test('should to have a valid response to apply type filter', async () => {
        const raffles = await controller.findMany({ type: 'COMBO' })
        expect(raffles).toEqual(expect.arrayContaining([expectRaffle]))
        expect(raffles[0].type).toBe('COMBO')
    })

    test('should return an empty array in case no id is found', async () => {
        const raffle = await controller.findRaffleId({ input_id: 99999 })
        expect(raffle).toEqual([])
    })
})
