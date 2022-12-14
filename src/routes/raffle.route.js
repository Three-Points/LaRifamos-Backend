import { Router } from 'express'
import { verifyAPIToken, verifyJWTToken } from '@middlewares/auth.middleware'
import { success } from '@middlewares/response.middleware'
import wrapper from '@middlewares/wrapper.middleware'
import {
    getRaffle,
    postRateRaffle,
    postShareRaffle,
} from '@services/raffle.service'
import { info } from '@utils/logger.util'

const router = Router()

/**
 * @name GET
 * @description Get a Raffle by ID. */
router.get(
    '/:id',
    wrapper(verifyAPIToken),
    wrapper(async (req, res, next) => {
        info('GET /raffle/:id')
        const { id } = req.params
        res.locals.data = await getRaffle(Number(id))
        next()
    }),
    success
)

/**
 * @name POST
 * @description Like a raffle and connect it with an account. */
router.post(
    '/like/:id',
    wrapper(verifyJWTToken),
    wrapper(async (req, res, next) => {
        info('POST /raffle/like/:id')
        const { id } = req.params
        const account = res.locals.data
        await postRateRaffle(account?.email, Number(id))
        res.locals.code = 204
        next()
    }),
    success
)

/**
 * @name POST
 * @description Share a raffle and connect it with an account. */
router.post(
    '/share/:id',
    wrapper(verifyJWTToken),
    wrapper(async (req, res, next) => {
        info('POST /raffle/share/:id')
        const { id } = req.params
        const account = res.locals.data
        await postShareRaffle(account?.email, Number(id))
        res.locals.code = 204
        next()
    }),
    success
)

export default router
