import Raffle from '@models/Raffle.model'

const mockFindMany = jest.fn()
jest.mock('@libs/Prisma', () => {
    return jest.fn().mockImplementation(() => {
        return {
            client: {
                findMany: mockFindMany,
            },
        }
    })
})

afterEach(() => {
    jest.clearAllMocks()
})

describe('When looking an account using findMany method', () => {
    const raffle = new Raffle()
    describe('should work without throw an error', () => {
        test('when will all the raffles return', async () => {
            await raffle.findMany({})
            expect(mockFindMany).toHaveBeenCalled()

            const _callFindMany = mockFindMany.mock.calls[0][0]
            expect(_callFindMany.hasOwnProperty('where')).toBe(true)
        })
        test('when all raffles by category filter will be returned', async () => {
            await raffle.findMany({ categories: ['event'] })
            const _callFindMany = mockFindMany.mock.calls[0][0]
            expect(_callFindMany.hasOwnProperty('where')).toBe(true)
            expect(_callFindMany?.where.hasOwnProperty('OR')).toBe(true)
            expect(
                _callFindMany?.where?.OR.some((filter) =>
                    filter.hasOwnProperty('category')
                )
            ).toBe(true)
        })
        test('when all raffles by name filter will be returned', async () => {
            await raffle.findMany({ name: 'Green' })
            const _callFindMany = mockFindMany.mock.calls[0][0]
            expect(_callFindMany.hasOwnProperty('where')).toBe(true)
            expect(_callFindMany?.where.hasOwnProperty('name')).toBe(true)
        })
        test('when all raffles by state filter will be returned', async () => {
            await raffle.findMany({ state: 'FINISHED' })
            const _callFindMany = mockFindMany.mock.calls[0][0]
            expect(_callFindMany.hasOwnProperty('where')).toBe(true)
            expect(_callFindMany?.where.hasOwnProperty('state')).toBe(true)
        })
        test('when all raffles by type filter will be returned', async () => {
            await raffle.findMany({ type: 'COMBO' })
            const _callFindMany = mockFindMany.mock.calls[0][0]
            expect(_callFindMany.hasOwnProperty('where')).toBe(true)
            expect(_callFindMany?.where.hasOwnProperty('type')).toBe(true)
        })
    })
    test('and want to include products relation', async () => {
        await raffle.findMany({})
        const _calls = mockFindMany.mock.calls[0][0]
        expect(_calls?.include.hasOwnProperty('products')).toBe(true)
    })
})
