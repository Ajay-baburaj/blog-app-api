import { userRepository } from "../../application/repository/userInterface.js";
import { userRepositoryMongoDB } from "../../framework/database/mongoDb/repositories/userRepository.js";
import { userLogin, userSignUp } from '../../application/usecases/auth/userAuth.js';
import { authServiceInterface } from "../../application/services/userAuthInterface.js";
import { authServices } from "../../framework/services/authServices.js";
import AppError from "../../utils/appError.js";
import HttpStatus from "../../utils/httpStatus.js";


const authController = () => {
    const user = userRepository(userRepositoryMongoDB())
    const service = authServiceInterface(authServices())

    const signup = async (req, res) => {
        const { email, username, password} = req.body
        userSignUp(user,username,email,password,service).then((response)=>{
            res.status(200).json(response)
        }).catch((err)=>{
            throw new AppError(err.message,HttpStatus.UNAUTHORIZED)
        })
    
    }

    const login = async (req, res) => {
        const { username, password } = req.body
        userLogin(user, username, password,service).then((response) => {
            res.status(200).json(response)
        }).catch((err) => {
         throw new AppError(err.message,HttpStatus.UNAUTHORIZED)
        })
    }
    return {
        signup,
        login
    }

}

export default authController