import { userRepository } from "../../application/repository/userInterface.js";
import { userRepositoryMongoDB } from "../../framework/database/mongoDb/repositories/userRepository.js";
import { generateAccesTokenFromRefresh, userLogin, userSignUp } from '../../application/usecases/auth/userAuth.js';
import { authServiceInterface } from "../../application/services/userAuthInterface.js";
import { authServices } from "../../framework/services/authServices.js";
import AppError from "../../utils/appError.js";
import HttpStatus from "../../utils/httpStatus.js";


const authController = () => {
    const user = userRepository(userRepositoryMongoDB())
    const service = authServiceInterface(authServices())

    const signup = async (req, res,next) => {
        const { email, username, password} = req.body
        userSignUp(user,username,email,password,service).then((response)=>{
            res.status(200).json(response)
        }).catch((err)=>{
            next(new AppError(err.message,HttpStatus.UNAUTHORIZED)) 
        })
    
    }

    const login = async(req,res,next) => {
        const { username, password } = req.body
        userLogin(user, username, password,service).then((response) => {
            res.status(200).json(response)
        }).catch((err) => {
            next (new AppError(err.message,HttpStatus.UNAUTHORIZED)) 
        })
    }

    const generateAccesToken = async(req,res,next)=>{
        const {userId,refreshToken} = req.body
        generateAccesTokenFromRefresh(userId,refreshToken,service).then((response)=>{
         res.status(200).json(response)
       }).catch((err)=>{
            next(new AppError(err.message,HttpStatus.FORBIDDEN))
       })


    }
    return {
        signup,
        login,
        generateAccesToken
    }

}

export default authController