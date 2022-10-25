import { complete, fail } from '@utils/logger.util'

/**
 * @description Handler error response as express middleware. */
export const error = (err, req, res, _) => {
    const { code, error, message } = err
    fail(error, message)
    res.status(code).send(message)
}

/**
 * @description Handler successful response as express middleware. */
//TODO Create pagination ...(res.locals.info && { info: res.locals.info })
export const success = (req, res, _) => {
    complete(`${req.method} operation`)
    res.status(res.locals.code || 200).json({
        ...(res.locals.result && {
            results: res.locals.result,
        }),
        ...res.locals.data,
    })
}
