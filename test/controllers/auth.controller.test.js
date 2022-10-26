import jwt from 'jsonwebtoken'
import Auth from '@controllers/auth.controller'
import Account from '@models/Account.model'
import { mockAccount } from './account/account.mock'

afterEach(() => {
    jest.clearAllMocks()
})

const mockFindUnique = jest.spyOn(Account.prototype, 'findUnique')
mockFindUnique.mockImplementation(() =>
    Promise.resolve({
        id: mockAccount.id,
        name: mockAccount.name,
        email: mockAccount.email,
        password: mockAccount.password,
    })
)
const auth = new Auth()

describe('When trying to authenticate using authentication method', () => {
    describe('should throw a UNAUTHORIZED error', () => {
        test('if it not be send email and/or password parameters', async () => {
            try {
                await auth.authentication({})
            } catch ({ code, message, error }) {
                expect({ code, message, error }).toStrictEqual({
                    code: 401,
                    error: 'Unauthorized',
                    message: 'Email or password is missing',
                })
            }
        })
        test('if it does not exist any account or the password does not match', async () => {
            try {
                await auth.authentication({
                    email: 'mail@email.com',
                    password: '123456',
                })
            } catch ({ code, message, error }) {
                expect({ code, message, error }).toStrictEqual({
                    code: 401,
                    error: 'Unauthorized',
                    message: 'Email or password is wrong',
                })
            }
        })
    })
    test('should return a token if the email and password are correct', async () => {
        const { token } = await auth.authentication({
            email: 'btompsett0@narod.ru',
            password: 'PTszph3',
        })
        expect(token).toBeTruthy()
        expect(jwt.decode(token)).toEqual(
            expect.objectContaining({
                email: expect.any(String),
                name: expect.any(String),
            })
        )
    })
})

describe('when validate an identity using verification method', () => {
    test('should throw a UNAUTHORIZED error to send bad token', async () => {
        try {
            await auth.verification('bad-token')
        } catch ({ code, message, error }) {
            expect({ code, message, error }).toStrictEqual({
                code: 401,
                error: 'Unauthorized',
                message: 'Token is invalid',
            })
        }
    })
    test('should return an account if the token is valid', async () => {
        jest.spyOn(jwt, 'verify').mockImplementation(() => ({
            email: 'btompsett0@narod.ru',
        }))
        const account = await auth.verification('valid-token')
        expect(account).toEqual(
            expect.objectContaining({
                name: expect.any(String),
                email: expect.any(String),
            })
        )
    })
})
