/**
 * @description Wrapper express middleware. */
export default (fn) => (req, res, next) => {
    fn(req, res, next).catch(next)
}
