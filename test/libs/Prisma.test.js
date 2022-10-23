import Prisma from '@libs/Prisma'
import ErrorServer from '@controllers/ErrorServer.controller'

describe('Prisma Library', () => {
    test('should throw a SERVER error if it does not exist the model', async () => {
        try {
            const _client = new Prisma('profile').client
            await _client.findMany()
        } catch (error) {
            expect(error).toBeInstanceOf(ErrorServer)
        }
    })
})
