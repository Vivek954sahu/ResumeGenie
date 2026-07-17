 export class ApiError extends Error {
    constructor (statusCode, message, options = {}){
        super(message);

        this.name = "ApiError";
        this.statusCode = statusCode;
        
        this.errors = options.errors || null;

        Error.captureStackTrace(this, this.constructor);
    }
};