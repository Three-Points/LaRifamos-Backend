import Account from '@models/Account.model'

const mockFindUnique = jest.fn()
const mockUpdate = jest.fn()
jest.mock('@libs/Prisma', () => {
    return jest.fn().mockImplementation(() => {
        return {
            client: {
                findUnique: mockFindUnique,
                update: mockUpdate,
            },
        }
    })
})

afterEach(() => {
    jest.clearAllMocks()
})

describe('Unit test on Account model', () => {
    const account = new Account()
    describe('Using the findUnique method to find an account', () => {
        test('should be called by id and optionally include specific liked raffle', async () => {
            await account.findUnique({ id: 1, liked: { id: 1 } })
            expect(mockFindUnique.mock.calls[0][0]).toEqual(
                expect.objectContaining({
                    where: expect.objectContaining({
                        id: expect.any(Number),
                    }),
                    include: expect.objectContaining({
                        liked: expect.objectContaining({
                            where: expect.objectContaining({
                                id: expect.any(Number),
                            }),
                        }),
                    }),
                })
            )
        })
        test('should be called by id and include raffle relations', async () => {
            await account.findUnique({ id: 1 }, { include: { liked: true } })
            expect(
                mockFindUnique.mock.calls[0][0].hasOwnProperty('include')
            ).toBe(true)
        })
        test('should be called by email and optionally include specific shared raffle', async () => {
            await account.findUnique({ email: 'btompsett0@narod.ru' })
            expect(mockFindUnique.mock.calls[0][0]).toEqual(
                expect.objectContaining({
                    where: expect.objectContaining({
                        email: expect.any(Number),
                    }),
                    include: expect.objectContaining({
                        shared: expect.objectContaining({
                            where: expect.objectContaining({
                                id: expect.any(Number),
                            }),
                        }),
                    }),
                })
            )
        })
        test('should throw a SERVER error if it not be send mandatory parameters', async () => {
            try {
                await account.findUnique({})
            } catch ({ code, message, error }) {
                expect({ code, message, error }).toStrictEqual({
                    code: 500,
                    error: 'Internal Server Error',
                    message: 'required mandatory parameters',
                })
            }
        })
    })
    describe('Using the update method', () => {
        describe('to modify an account', () => {
            test('should be called by payload defined by one account attribute at least', async () => {
                await account.update({ id: 1 }, { name: 'test' })
                expect(mockUpdate.mock.calls[0][0]).toEqual(
                    expect.objectContaining({
                        where: expect.objectContaining({
                            id: expect.any(Number),
                        }),
                        data: expect.objectContaining({
                            name: expect.any(String),
                        }),
                    })
                )
            })
            describe('should throw a SERVER error if it not be send', () => {
                test('id parameter', async () => {
                    try {
                        await account.update({}, { likedRaffleId: 1 })
                    } catch ({ code, message, error }) {
                        expect({ code, message, error }).toStrictEqual({
                            code: 500,
                            error: 'Internal Server Error',
                            message: 'id parameter is mandatory',
                        })
                    }
                })
                test('payload parameter', async () => {
                    try {
                        await account.update({ id: 1 }, {})
                    } catch ({ code, message, error }) {
                        expect({ code, message, error }).toStrictEqual({
                            code: 500,
                            error: 'Internal Server Error',
                            message: 'payload parameter is mandatory',
                        })
                    }
                })
            })
        })
    })
    describe('Using the either connect/disconnect methods to link/unlink an account with a raffle', () => {
        test('should be called with query, payload and option request', async () => {
            await account.connect({ id: 1 }, { sharedRaffleId: 1 })
            expect(mockUpdate.mock.calls[0][0]).toEqual(
                expect.objectContaining({
                    where: expect.objectContaining({
                        id: expect.any(Number),
                    }),
                    data: expect.objectContaining({
                        shared: expect.objectContaining({
                            connect: expect.objectContaining({
                                id: expect.any(Number),
                            }),
                        }),
                    }),
                    include: expect.objectContaining({
                        shared: expect.any(Boolean),
                    }),
                })
            )

            await account.disconnect({ id: 1 }, { likedRaffleId: 1 })
            expect(mockUpdate.mock.calls[1][0]).toEqual(
                expect.objectContaining({
                    where: expect.objectContaining({
                        id: expect.any(Number),
                    }),
                    data: expect.objectContaining({
                        liked: expect.objectContaining({
                            disconnect: expect.objectContaining({
                                id: expect.any(Number),
                            }),
                        }),
                    }),
                    include: expect.objectContaining({
                        liked: expect.any(Boolean),
                    }),
                })
            )
        })
        describe('should throw a SERVER error if it not be send', () => {
            test('id parameter', async () => {
                try {
                    await account.connect({}, { likedRaffleId: 1 })
                } catch ({ code, message, error }) {
                    expect({ code, message, error }).toStrictEqual({
                        code: 500,
                        error: 'Internal Server Error',
                        message: 'id parameter is mandatory',
                    })
                }
            })
            test('likedRaffleId or sharedRaffleId parameter', async () => {
                try {
                    await account.connect({ id: 1 }, {})
                } catch ({ code, message, error }) {
                    expect({ code, message, error }).toStrictEqual({
                        code: 500,
                        error: 'Internal Server Error',
                        message: 'payload parameter is mandatory',
                    })
                }
            })
        })
    })
})

describe('When delete a relation between account using disconnect method', () => {
    const account = new Account()
    describe('should throw a SERVER error if it not be send mandatory parameters', () => {
        test('if it not be send id parameter', async () => {
            try {
                await account.disconnect({}, { likedRaffleId: 1 })
            } catch ({ code, message, error }) {
                expect({ code, message, error }).toStrictEqual({
                    code: 500,
                    error: 'Internal Server Error',
                    message: 'id parameter is mandatory',
                })
            }
        })
        test('if it not be send likedRaffleId parameter', async () => {
            try {
                await account.disconnect({ id: 1 }, {})
            } catch ({ code, message, error }) {
                expect({ code, message, error }).toStrictEqual({
                    code: 500,
                    error: 'Internal Server Error',
                    message: 'likedRaffleId parameter is mandatory',
                })
            }
        })
    })
})
