import HttpStatus from "../utils/httpStatus.js";

class AppError extends Error {
    constructor(message,HttpStatus) {
        super(message);
        this.HttpStatus = HttpStatus;
        this.status = `${HttpStatus}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }
}

export default AppError;
