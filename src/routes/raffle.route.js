import { Router } from 'express'
import { verifyJWTToken } from '@middlewares/auth.middleware'
import { success } from '@middlewares/response.middleware'
import wrapper from '@middlewares/wrapper.middleware'
import { postRateRaffle, postShareRaffle } from '@services/raffle.service'
import { info } from '@utils/logger.util'

const router = Router()

/**
 * @name POST
 * @description Gets project info as health route. */
router.post(
    '/like/:id',
    wrapper(verifyJWTToken),
    wrapper(async (req, res, next) => {
        info('POST /raffle/like/:id')
        const { id } = req.params
        const account = res.locals.data
        await postRateRaffle(account.email, Number(id))
        res.locals.code = 204
        next()
    }),
    success
)

/**
 * @name POST
 * @description Gets project info as health route. */
router.post(
    '/share/:id',
    wrapper(verifyJWTToken),
    wrapper(async (req, res, next) => {
        info('POST /raffle/share/:id')
        const { id } = req.params
        const account = res.locals.data
        await postShareRaffle(account.email, Number(id))
        res.locals.code = 204
        next()
    }),
    success
)

export default router