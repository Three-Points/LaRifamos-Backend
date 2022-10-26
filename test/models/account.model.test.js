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

describe('When looking an account using findUnique method', () => {
    const account = new Account()
    test('should work without throw an error', async () => {
        await account.findUnique({ id: 1 })
        expect(mockFindUnique).toHaveBeenCalled()

        let _calls = mockFindUnique.mock.calls[0][0]
        expect(_calls.hasOwnProperty('where')).toBe(true)
        expect(_calls.where.hasOwnProperty('id')).toBe(true)

        await account.findUnique({ email: 'btompsett0@narod.ru' })
        expect(mockFindUnique).toHaveBeenCalled()

        _calls = mockFindUnique.mock.calls[1][0]
        expect(_calls.hasOwnProperty('where')).toBe(true)
        expect(_calls.where.hasOwnProperty('email')).toBe(true)
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
    describe('to include raffles relations', () => {
        test('should be included liked or shared raffles', async () => {
            await account.findUnique({ id: 1, liked: { id: 1 } })

            let _calls = mockFindUnique.mock.calls[0][0]
            expect(_calls.hasOwnProperty('include')).toBe(true)
            expect(_calls?.include.hasOwnProperty('liked')).toBe(true)
            expect(_calls?.include?.liked).toEqual(
                expect.objectContaining({
                    where: expect.objectContaining({
                        id: expect.any(Number),
                    }),
                })
            )

            await account.findUnique({ id: 1, shared: { id: 1 } })
            _calls = mockFindUnique.mock.calls[1][0]
            expect(_calls.hasOwnProperty('include')).toBe(true)
            expect(_calls?.include.hasOwnProperty('shared')).toBe(true)
            expect(_calls?.include?.shared).toEqual(
                expect.objectContaining({
                    where: expect.objectContaining({
                        id: expect.any(Number),
                    }),
                })
            )
        })
        test('using options parameters to only join relation as response', async () => {
            await account.findUnique({ id: 1 }, { include: { liked: true } })
            const _calls = mockFindUnique.mock.calls[0][0]
            expect(_calls.hasOwnProperty('include')).toBe(true)
        })
    })
})

describe('When update an account using update method', () => {
    const account = new Account()
    describe('should work without throw an error', () => {
        test('to call it correctly', async () => {
            await account.update({ id: 1 }, { name: 'test' })
            expect(mockUpdate).toHaveBeenCalled()
            const _calls = mockUpdate.mock.calls[0][0]
            expect(_calls.hasOwnProperty('where')).toBe(true)
            expect(_calls.hasOwnProperty('data')).toBe(true)
        })
        test('to connect/disconnect an account with a liked raffle', async () => {
            await account.connect({ id: 1 }, { likedRaffleId: 1 })
            const _callConnect = mockUpdate.mock.calls[0][0]
            expect(_callConnect.hasOwnProperty('data')).toBe(true)
            expect(_callConnect?.data?.liked).toEqual(
                expect.objectContaining({
                    connect: expect.objectContaining({
                        id: expect.any(Number),
                    }),
                })
            )
            expect(_callConnect.hasOwnProperty('include')).toBe(true)
            expect(_callConnect?.include).toEqual(
                expect.objectContaining({
                    liked: expect.any(Boolean),
                })
            )

            await account.disconnect({ id: 1 }, { likedRaffleId: 1 })
            const _callDisconnect = mockUpdate.mock.calls[1][0]
            expect(_callConnect.hasOwnProperty('data')).toBe(true)
            expect(_callDisconnect?.data?.liked).toEqual(
                expect.objectContaining({
                    disconnect: expect.objectContaining({
                        id: expect.any(Number),
                    }),
                })
            )
            expect(_callDisconnect.hasOwnProperty('include')).toBe(true)
            expect(_callDisconnect?.include).toEqual(
                expect.objectContaining({
                    liked: expect.any(Boolean),
                })
            )
        })
        test('to connect an account with a shared raffle', async () => {
            await account.connect({ id: 1 }, { sharedRaffleId: 1 })
            const _calls = mockUpdate.mock.calls[0][0]
            expect(_calls.hasOwnProperty('include')).toBe(true)
            expect(_calls?.data?.shared).toEqual(
                expect.objectContaining({
                    connect: expect.objectContaining({
                        id: expect.any(Number),
                    }),
                })
            )
            expect(_calls?.include).toEqual(
                expect.objectContaining({
                    shared: expect.any(Boolean),
                })
            )
        })
    })
    describe('should throw a SERVER error', () => {
        test('if it not be send id parameter', async () => {
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
        test('if it not be send payload parameter', async () => {
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

describe('When create a relation between account using connect method', () => {
    const account = new Account()
    describe('should throw a SERVER error', () => {
        test('if it not be send id parameter', async () => {
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
        test('if it not be send likedRaffleId or sharedRaffleId parameter', async () => {
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
