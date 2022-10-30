import Ticket from '@models/Ticket.model'

const mockFindUnique = jest.fn()
const mockFindMany = jest.fn()
const mockCreate = jest.fn()
jest.mock('@libs/Prisma', () => {
    return jest.fn().mockImplementation(() => {
        return {
            client: {
                findUnique: mockFindUnique,
                findMany: mockFindMany,
                create: mockCreate,
            },
        }
    })
})
afterEach(() => {
    jest.clearAllMocks()
})

describe('Unit test on Ticket model', () => {
    const ticket = new Ticket()

    describe('When calling findUnique to return a ticket by its number', () => {
        test('should be called with query and include structures', async () => {
            await ticket.findUnique({ number: 1 })
            expect(mockFindUnique).toHaveBeenCalled()
            expect(
                mockFindUnique.mock.calls[0][0].hasOwnProperty('where')
            ).toBe(true)
            expect(
                mockFindUnique.mock.calls[0][0].where.hasOwnProperty('number')
            ).toBe(true)
            expect(
                mockFindUnique.mock.calls[0][0].hasOwnProperty('include')
            ).toBe(true)
            expect(
                mockFindUnique.mock.calls[0][0].include.hasOwnProperty(
                    'account'
                )
            ).toBe(true)
            expect(
                mockFindUnique.mock.calls[0][0].include.hasOwnProperty('raffle')
            ).toBe(true)
            expect(mockFindUnique.mock.calls[0][0]?.include).toEqual(
                expect.objectContaining({
                    account: expect.any(Boolean),
                    raffle: expect.any(Boolean),
                })
            )
        })
        test('should throw a SERVER error if no required parameters are sent', async () => {
            try {
                await ticket.findUnique({})
            } catch ({ code, message, error }) {
                expect({ code, message, error }).toStrictEqual({
                    code: 500,
                    error: 'Internal Server Error',
                    message: 'number parameter is mandatory',
                })
            }
        })
    })

    describe('When calling findMany to return all tickets', () => {
        test('should be called using with an empty query and include structures', async () => {
            await ticket.findMany({})
            expect(mockFindMany).toHaveBeenCalled()
            expect(mockFindMany.mock.calls[0][0]).toEqual(
                expect.objectContaining({
                    where: expect.any(Object),
                    include: expect.objectContaining({
                        account: expect.any(Boolean),
                        raffle: expect.any(Boolean),
                    }),
                })
            )
        })
        test('filtered either by account or raffle', async () => {
            await ticket.findMany({ account: { id: 1 } })
            await ticket.findMany({ raffle: { id: 1 } })

            const filterByAccount = mockFindMany.mock.calls[0][0]
            const filterByRaffle = mockFindMany.mock.calls[1][0]

            expect(filterByAccount).toEqual(
                expect.objectContaining({
                    where: expect.objectContaining({
                        account: expect.objectContaining({
                            id: expect.any(Number),
                        }),
                    }),
                })
            )

            expect(filterByRaffle).toEqual(
                expect.objectContaining({
                    where: expect.objectContaining({
                        raffle: expect.objectContaining({
                            id: expect.any(Number),
                        }),
                    }),
                })
            )
        })
    })

    describe('When calling create to connect an account with a raffle', () => {
        test('should be called using a payload with account and raffle structures', async () => {
            await ticket.create({ account: { id: 1 }, raffle: { id: 1 } })
            expect(mockCreate).toHaveBeenCalled()
            expect(mockCreate.mock.calls[0][0]).toEqual(
                expect.objectContaining({
                    data: expect.objectContaining({
                        account: expect.objectContaining({
                            connect: expect.objectContaining({
                                id: expect.any(Number),
                            }),
                        }),
                        raffle: expect.objectContaining({
                            connect: expect.objectContaining({
                                id: expect.any(Number),
                            }),
                        }),
                    }),
                })
            )
        })
        test('should throw a SERVER error if no required parameters are sent', async () => {
            try {
                await ticket.create({})
            } catch ({ code, message, error }) {
                expect({ code, message, error }).toStrictEqual({
                    code: 500,
                    error: 'Internal Server Error',
                    message: 'required mandatory parameters',
                })
            }
        })
    })
})
