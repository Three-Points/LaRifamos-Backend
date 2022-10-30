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
    const { result, data, code } = res.locals
    res.status(code || 200).json({
        ...(!result && { ...data }),
        ...(result && { results: res.locals.result }),
    })
}
