import supertest from 'supertest'
import server from '@src/server'
import Account from '@models/Account.model'
import { mockAccount } from '../mocks/account.mock'
import jwt from 'jsonwebtoken'

beforeEach(() => {
    jest.resetModules()
    process.env = { ...process.env }
})
afterEach(() => {
    jest.clearAllMocks()
})
const request = supertest(server)
jest.spyOn(Account.prototype, 'findUnique').mockImplementation(() =>
    Promise.resolve(mockAccount)
)
jest.spyOn(Account.prototype, 'connect').mockImplementation(() =>
    Promise.resolve('Updated')
)
jest.spyOn(Account.prototype, 'disconnect').mockImplementation(() =>
    Promise.resolve('Updated')
)

describe('When request to the raffle route to rate a raffle', () => {
    test('should return 204 OK', async () => {
        jest.spyOn(jwt, 'verify').mockImplementationOnce(() => ({
            email: 'btompsett0@narod.ru',
        }))
        const { status } = await request
            .post('/raffle/like/3')
            .set('Authorization', 'token')
        expect(status).toBe(204)
    })
    describe('should throw a UNAUTHORIZED error', () => {
        test('when it does not send a token', async () => {
            const { status, text: response } = await request.post(
                '/raffle/like/3'
            )
            expect(status).toBe(401)
            expect(response).toBe('Token is required')
        })
        test('when it send a bad JWT token', async () => {
            const { status, text: response } = await request
                .post('/raffle/like/3')
                .set('Authorization', 'bad-token')
            expect(status).toBe(401)
            expect(response).toBe('Token is invalid')
        })
    })
})

describe('When request to the raffle route to share a raffle', () => {
    test('should return 204 OK', async () => {
        jest.spyOn(jwt, 'verify').mockImplementationOnce(() => ({
            email: 'btompsett0@narod.ru',
        }))
        const { status } = await request
            .post('/raffle/share/3')
            .set('Authorization', 'token')
        expect(status).toBe(204)
    })
    describe('should throw a UNAUTHORIZED error', () => {
        test('when it does not send a token', async () => {
            const { status, text: response } = await request.post(
                '/raffle/share/3'
            )
            expect(status).toBe(401)
            expect(response).toBe('Token is required')
        })
        test('when it send a bad JWT token', async () => {
            const { status, text: response } = await request
                .post('/raffle/share/3')
                .set('Authorization', 'bad-token')
            expect(status).toBe(401)
            expect(response).toBe('Token is invalid')
        })
    })
})
