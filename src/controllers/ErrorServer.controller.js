/**
 * @class ErrorServer
 * @description ErrorServer collection in server. */
export default class ErrorServer extends Error {
    /**
     * @private
     * @description Dictionary of error controller. */
    #errors = {
        SERVER: {
            code: 500,
            message: 'Internal Server Error',
        },
        DRIVER: {
            code: 503,
            message: 'Service Unavailable',
        },
        BAD_REQUEST: {
            code: 400,
            message: 'Bad Request',
        },
        UNAUTHORIZED: {
            code: 401,
            message: 'Unauthorized',
        },
        NOT_FOUND: {
            code: 404,
            message: 'Not Found',
        },
        EXIST: {
            code: 409,
            message: 'Conflict',
        },
    }

    /**
     * @constructor
     * @param {string} type Error type
     * @param {string} message Error message */
    constructor(type, message) {
        super(message || 'without trace')
        this.code = this.#errors[type].code
        this.error = this.#errors[type].message
    }
}
