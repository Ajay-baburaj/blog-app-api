import jwt from 'jsonwebtoken'
import AppError from '../../../utils/appError.js';
import HttpStatus from '../../../utils/httpStatus.js';

export const verifyUser = (req, res, next) => {
    if (req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")) {
        const authHeader = req.headers['authorization'];
        const token = authHeader.split(" ")[1]
        if (token == null) {
            next(new AppError('Invalid Token', HttpStatus.UNAUTHORIZED))
        } const {user} = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = user;
        return next();
        console.log('call is coming after next')
    } else {
        console.log('cll hre')
        next(new AppError('Access token not found', HttpStatus.FORBIDDEN))
    }
}

