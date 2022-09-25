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
export const success = (req, res, _) => {
    complete(`${req.method} operation`)
    res.status(200).json({
        ...(res.locals.info && { info: res.locals.info }),
        ...(res.locals.results && {
            results: res.locals.results,
        }),
        ...res.locals.data,
    })
}
