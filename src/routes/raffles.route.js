import { Router } from 'express'
import { verifyAPIToken } from '@middlewares/auth.middleware'
import { success } from '@middlewares/response.middleware'
import wrapper from '@middlewares/wrapper.middleware'
import { getRaffles } from '@services/raffle.service'
import { info } from '@utils/logger.util'

const router = Router()

/**
 * @name GET
 * @description Gets project info as health route. */
router.get(
    '/',
    wrapper(verifyAPIToken),
    wrapper(async (req, res, next) => {
        info('GET /raffles')
        res.locals.result = await getRaffles(req.query)
        next()
    }),
    success
)

export default router
