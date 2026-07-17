export const asyncHandler = (fn) => {
    return (req, res, next) => {
        Promise.then(fn(req, res, next))
               .catch(next);
    };
}