import Controller from '@controllers/Account.controller'
import Account from '@models/Account.model'
import { mockAccount } from '../../mocks/account.mock'
import { expectAccount } from './account.expect'

const mockFindUnique = jest.spyOn(Account.prototype, 'findUnique')
const mockConnect = jest.spyOn(Account.prototype, 'connect')
const mockDisconnect = jest.spyOn(Account.prototype, 'disconnect')

afterEach(() => {
    jest.clearAllMocks()
})

describe('Unit test on Account controller', () => {
    const controller = new Controller()

    describe('when looking for an account', () => {
        test('should have a valid response', async () => {
            mockFindUnique.mockImplementationOnce(() =>
                Promise.resolve({
                    id: mockAccount.id,
                    name: mockAccount.name,
                    email: mockAccount.email,
                    password: mockAccount.password,
                })
            )
            const account = await controller.findAccount({ id: 1 })
            expect(account).toEqual(
                expect.objectContaining({
                    id: expectAccount.id,
                    name: expectAccount.name,
                    email: expectAccount.email,
                    password: expectAccount.password,
                })
            )
        })
        test('should have a valid response when including liked raffles', async () => {
            mockFindUnique.mockImplementationOnce(() =>
                Promise.resolve({
                    name: mockAccount.name,
                    liked: mockAccount.liked,
                })
            )
            const account = await controller.findAccount(
                { id: 1 },
                { include: { liked: true } }
            )
            expect(account).toEqual(
                expect.objectContaining({
                    name: expectAccount.name,
                    liked: expectAccount.liked,
                })
            )
        })
        test('should have a valid response when including shared raffles', async () => {
            mockFindUnique.mockImplementationOnce(() =>
                Promise.resolve({
                    name: mockAccount.name,
                    shared: mockAccount.shared,
                })
            )
            const account = await controller.findAccount(
                { id: 1 },
                { include: { shared: true } }
            )
            expect(account).toEqual(
                expect.objectContaining({
                    name: expectAccount.name,
                    shared: expectAccount.shared,
                })
            )
        })
        test('should throw a NOT_FOUND error if it does not exist', async () => {
            mockFindUnique.mockImplementationOnce(() =>
                Promise.resolve(undefined)
            )
            try {
                await controller.findAccount({ id: 1 })
            } catch ({ code, message, error }) {
                expect({ code, message, error }).toStrictEqual({
                    code: 404,
                    error: 'Not Found',
                    message: 'Account not found',
                })
            }
        })
        test('should throw a SERVER error if it not be send mandatory parameters', async () => {
            try {
                await controller.findAccount({})
            } catch ({ code, message, error }) {
                expect({ code, message, error }).toStrictEqual({
                    code: 500,
                    error: 'Internal Server Error',
                    message: 'required mandatory parameters',
                })
            }
        })
    })

    describe('when rate a raffle', () => {
        test('should connect the raffle if it has been liked', async () => {
            mockFindUnique.mockImplementationOnce(() =>
                Promise.resolve({
                    name: mockAccount.name,
                    liked: [],
                })
            )
            mockConnect.mockImplementationOnce(() =>
                Promise.resolve({ liked: mockAccount.liked })
            )
            await controller.rateRaffle({ accountId: 1 }, { raffleId: 3 })
            expect(mockConnect.mock.calls.length).toBe(1)
        })
        test('should connect the raffle if it has been unliked', async () => {
            mockFindUnique.mockImplementationOnce(() =>
                Promise.resolve({ liked: mockAccount.liked })
            )
            mockDisconnect.mockImplementationOnce(() =>
                Promise.resolve({ liked: [] })
            )
            await controller.rateRaffle({ accountId: 1 }, { raffleId: 3 })
            expect(mockDisconnect.mock.calls.length).toBe(1)
        })
        test('should throw a SERVER error if it not be send id parameter', async () => {
            try {
                await controller.rateRaffle({}, {})
            } catch ({ code, message, error }) {
                expect({ code, message, error }).toStrictEqual({
                    code: 500,
                    error: 'Internal Server Error',
                    message: 'id parameter is mandatory',
                })
            }
        })
        test('should throw a SERVER error if it not be send raffleId parameter', async () => {
            try {
                await controller.rateRaffle({ accountId: 1 }, {})
            } catch ({ code, message, error }) {
                expect({ code, message, error }).toStrictEqual({
                    code: 500,
                    error: 'Internal Server Error',
                    message: 'raffleId parameter is mandatory',
                })
            }
        })
    })

    describe('when share a raffle', () => {
        test('should connect the raffle if it has not been shared', async () => {
            mockFindUnique.mockImplementationOnce(() =>
                Promise.resolve({ shared: [] })
            )
            mockConnect.mockImplementationOnce(() =>
                Promise.resolve({ shared: mockAccount.shared })
            )
            await controller.shareRaffle({ accountId: 1 }, { raffleId: 3 })
            expect(mockConnect.mock.calls.length).toBe(1)
        })
        test('should not connect the raffle if it has been shared', async () => {
            mockFindUnique.mockImplementationOnce(() =>
                Promise.resolve({ shared: mockAccount.shared })
            )
            await controller.shareRaffle({ accountId: 1 }, { raffleId: 3 })
            expect(mockConnect.mock.calls.length).toBe(0)
        })
        test('should throw a SERVER error if it not be send id parameter', async () => {
            try {
                await controller.shareRaffle({}, {})
            } catch ({ code, message, error }) {
                expect({ code, message, error }).toStrictEqual({
                    code: 500,
                    error: 'Internal Server Error',
                    message: 'id parameter is mandatory',
                })
            }
        })
        test('should throw a SERVER error if it not be send raffleId parameter', async () => {
            try {
                await controller.shareRaffle({ accountId: 1 }, {})
            } catch ({ code, message, error }) {
                expect({ code, message, error }).toStrictEqual({
                    code: 500,
                    error: 'Internal Server Error',
                    message: 'raffleId parameter is mandatory',
                })
            }
        })
    })
})
