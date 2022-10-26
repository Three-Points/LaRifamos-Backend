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
            mode: server.get('mode'),
            version: server.get('version'),
        }
        next()
    }),
    success
)

/**
 * @name POST
 * @description Login. */
router.post('/login', wrapper(verifyAPIToken), wrapper(login), success)

/**
 * @name GET
 * @description Verify. */
router.get('/verify', wrapper(verifyJWTToken), success)

export default router
