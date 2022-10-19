import ErrorServer from '@controllers/ErrorServer.controller'

const _error = jest.fn((type) => {
    throw new ErrorServer(type, 'An error occurred!!')
})

describe('ErrorServer Controller', () => {
    it('object should be a valid definition', async () => {
        const error = new ErrorServer('SERVER')
        expect(error).toEqual(
            expect.objectContaining({
                code: expect.any(Number),
                message: expect.any(String),
                error: expect.any(String),
            })
        )
    })
    it('call to ErrorServer if an error SERVER occurs', async () => {
        expect(() => _error('SERVER')).toThrow(ErrorServer)
    })
    it('call to ErrorServer if an error DRIVER occurs', async () => {
        expect(() => _error('DRIVER')).toThrow(ErrorServer)
    })
    it('call to ErrorServer if an error BAD_REQUEST occurs', async () => {
        expect(() => _error('BAD_REQUEST')).toThrow(ErrorServer)
    })
    it('call to ErrorServer if an error UNAUTHORIZED occurs', async () => {
        expect(() => _error('UNAUTHORIZED')).toThrow(ErrorServer)
    })
    it('call to ErrorServer if an error NOT_FOUND occurs', async () => {
        expect(() => _error('NOT_FOUND')).toThrow(ErrorServer)
    })
    it('call to ErrorServer if an error EXIST occurs', async () => {
        expect(() => _error('EXIST')).toThrow(ErrorServer)
    })
})
