import { Router } from 'express'
import { verifyAPIToken, verifyJWTToken } from '@middlewares/auth.middleware'
import { success } from '@middlewares/response.middleware'
import wrapper from '@middlewares/wrapper.middleware'
import { getLikedRaffles, getRaffles } from '@services/raffle.service'
import { getEnrolledRaffles } from '@services/ticket.service'
import { info } from '@utils/logger.util'

const router = Router()

/**
 * @name GET
 * @description Returns a list of raffles and its products related. */
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

/**
 * @name GET
 * @description Returns a list of raffles liked by an account. */
router.get(
    '/liked',
    wrapper(verifyJWTToken),
    wrapper(async (req, res, next) => {
        info('GET /raffles/liked')
        const account = res.locals.data
        res.locals.result = await getLikedRaffles(account?.email)
        next()
    }),
    success
)

/**
 * @name GET
 * @description Returns a list of raffles enrolled by an account. */
router.get(
    '/enrolled',
    wrapper(verifyJWTToken),
    wrapper(async (req, res, next) => {
        info('GET /raffles/enrolled')
        const account = res.locals.data
        res.locals.result = await getEnrolledRaffles(account?.email)
        next()
    }),
    success
)

export default router
