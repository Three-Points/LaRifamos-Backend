import { Router } from 'express'

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

export default router
