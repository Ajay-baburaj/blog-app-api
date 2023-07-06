import AppError from '../../../utils/appError.js';
import HttpStatus from '../../../utils/httpStatus.js';
import { authServices } from '../../services/authServices.js';

export const verifyUser = (req, res, next) => {
    if (req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")) {
        const authHeader = req.headers['authorization'];
        const token = authHeader.split(" ")[1]
        if (token == null) {
            next(new AppError('Invalid Token', HttpStatus.UNAUTHORIZED))
        } const {data} = authServices().verifyJwt(token, process.env.JWT_SECRET)
        req.userId = data.user;
        return next();
    } else {
        next(new AppError('Access token not found', HttpStatus.FORBIDDEN))
    }
}

