import supertest from 'supertest'
import server from '@src/server'
import Model from '@models/Raffle.model'
import { mockRaffle } from '../controllers/raffle/raffle.mock'

beforeEach(() => {
    jest.resetModules()
    process.env = { ...process.env }
})
afterEach(() => {
    jest.clearAllMocks()
})
const request = supertest(server)
jest.spyOn(Model.prototype, 'findMany').mockImplementation(() =>
    Promise.resolve([mockRaffle])
)

describe('When request to the raffles route', () => {
    test('should return 200 OK and array with raffles', async () => {
        const {
            status,
            body: {
                results: [response],
            },
        } = await request.get('/raffles').set('Authorization', 'token')
        expect(status).toBe(200)
        expect(response).toHaveProperty('id')
        expect(response).toHaveProperty('name')
        expect(response).toHaveProperty('participants')
        expect(response).toHaveProperty('ticketCost')
        expect(response).toHaveProperty('state')
        expect(response).toHaveProperty('type')
        expect(response).toHaveProperty('category')
        expect(response).toHaveProperty('products')
        expect(response?.products).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    images: expect.arrayContaining([expect.any(String)]),
                }),
            ])
        )
    })
    test('should return 401 UNAUTHORIZED when token is not provided', async () => {
        const { status, text: response } = await request.get('/raffles')
        expect(status).toBe(401)
        expect(response).toBe('Token is required')
    })
})
