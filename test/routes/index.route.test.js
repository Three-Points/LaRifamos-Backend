import supertest from 'supertest'
import jwt from 'jsonwebtoken'
import server from '@src/server'
import Account from '@models/Account.model'
import { mockAccount } from '../mocks/account.mock'

beforeEach(() => {
    jest.resetModules()
    process.env = { ...process.env }
})
afterEach(() => {
    jest.clearAllMocks()
})

const request = supertest(server)
const mockFindUnique = jest.spyOn(Account.prototype, 'findUnique')
mockFindUnique.mockImplementation(() =>
    Promise.resolve({
        id: mockAccount.id,
        name: mockAccount.name,
        email: mockAccount.email,
        password: mockAccount.password,
    })
)

describe('When request to health route', () => {
    test('should return 200 OK and general information of server', async () => {
        const { status, body: response } = await request.get('/')
        expect(status).toBe(200)
        expect(response).toHaveProperty('project')
        expect(response).toHaveProperty('mode')
        expect(response).toHaveProperty('version')
    })
})

describe('When request to login route', () => {
    describe('should throw an UNAUTHORIZED error', () => {
        test('when API token is not provided', async () => {
            const { status, text: response } = await request.post('/login')
            expect(status).toBe(401)
            expect(response).toBe('Token is required')
        })
        test('if it not be send email and/or password parameters', async () => {
            const { status, text: response } = await request
                .post('/login')
                .set('Authorization', 'token')
            expect(status).toBe(401)
            expect(response).toBe('Email or password is missing')
        })
        test('if it does not exist any account or the password does not match', async () => {
            const { status, text: response } = await request
                .post('/login')
                .set('Authorization', 'token')
                .send({
                    email: 'mail@email.com',
                    password: '123456',
                })
            expect(status).toBe(401)
            expect(response).toBe('Email or password is wrong')
        })
    })
    test('should return a token if the email and password are correct', async () => {
        const {
            status,
            body: { token },
        } = await request.post('/login').set('Authorization', 'token').send({
            email: 'btompsett0@narod.ru',
            password: 'PTszph3',
        })
        expect(status).toBe(200)
        expect(token).toBeTruthy()
        expect(jwt.decode(token)).toEqual(
            expect.objectContaining({
                email: expect.any(String),
                name: expect.any(String),
            })
        )
    })
})

describe('When request to verify route', () => {
    describe('should throw an UNAUTHORIZED error', () => {
        test('when it does not send a token', async () => {
            const { status, text: response } = await request.get('/verify')
            expect(status).toBe(401)
            expect(response).toBe('Token is required')
        })
        test('should throw an UNAUTHORIZED error if it send a bad JWT token', async () => {
            const { status, text: response } = await request
                .get('/verify')
                .set('Authorization', 'bad-token')
            expect(status).toBe(401)
            expect(response).toBe('Token is invalid')
        })
    })
    test('should return a basic information of an account to verify identity from token', async () => {
        jest.spyOn(jwt, 'verify').mockImplementationOnce(() => ({
            email: 'btompsett0@narod.ru',
        }))
        const { status, body: response } = await request
            .get('/verify')
            .set('Authorization', 'valid-token')
        expect(status).toBe(200)
        console.log(response)
    })
})
