import Prisma from '@libs/Prisma'
import ErrorServer from '@controllers/ErrorServer.controller'

describe('Prisma Library', () => {
    const _client = new Prisma('raffle')
    test('should define a findMany promise', () => {
        expect(_client.findMany({})).toBeDefined()
    })
    test('should throw an SERVER error', async () => {
        try {
            const _profile = new Prisma('profile')
            await _profile.findMany()
        } catch (error) {
            expect(error).toBeInstanceOf(ErrorServer)
        }
    })
})
