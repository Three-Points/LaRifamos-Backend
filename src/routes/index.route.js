import { Router } from 'express'
import {
    verifyAPIToken,
    verifyJWTToken,
    login,
} from '@middlewares/auth.middleware'
import server from '../server'
import { success } from '@middlewares/response.middleware'
import wrapper from '@middlewares/wrapper.middleware'
import { info } from '@utils/logger.util'

const router = Router()

/**
 * @name GET
 * @description Gets project info as health route. */
router.get(
    '/',
    wrapper(async (_, res, next) => {
        info('GET /')
        res.locals.data = {
            project: 'LaRifamos',
            environment: server.get('ENVIRONMENT'),
            version: server.get('version'),
        }
        next()
    }),
    success
)

/**
 * @name POST
 * @description Login account. */
router.post('/login', wrapper(verifyAPIToken), wrapper(login), success)

/**
 * @name GET
 * @description Get an identification of the current JWT. */
router.get('/verify', wrapper(verifyJWTToken), success)

export default router
