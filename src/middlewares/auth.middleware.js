import { API_TOKEN } from '@config/env'
import AuthController from '@controllers/Auth.controller'
import ErrorServer from '@controllers/ErrorServer.controller'

const auth = new AuthController()

/**
 * @description Authentication middleware. */
export const verifyAPIToken = async (req, _, next) => {
    const { authorization } = req.headers
    if (!authorization || authorization !== API_TOKEN)
        throw new ErrorServer('UNAUTHORIZED', 'Token is required')
    next()
}

/**
 * @description Verify user token. */
export const verifyJWTToken = async (req, res, next) => {
    const { authorization } = req.headers
    if (!authorization)
        throw new ErrorServer('UNAUTHORIZED', 'Token is required')
    res.locals.data = await auth.verification(authorization)
    next()
}

/**
 * @description Authenticate user. */
export const login = async (req, res, next) => {
    res.locals.data = await auth.authentication(req.body)
    next()
}
