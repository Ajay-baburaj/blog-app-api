import { userRepository } from "../../application/repository/userInterface.js";
import { userRepositoryMongoDB } from "../../framework/database/mongoDb/repositories/userRepository.js";
import { userLogin, userSignUp } from '../../application/usecases/auth/userAuth.js';
import { authServiceInterface } from "../../application/services/userAuthInterface.js";
import { authServices } from "../../framework/services/authServices.js";


const authController = () => {
    const user = userRepository(userRepositoryMongoDB())
    const service = authServiceInterface(authServices())
    
    const signup = async (req, res) => {
        const { email, username, password} = req.body
        userSignUp(user,username,email,password).then((res)=>{
            res.status(200).json(res)
        }).catch((err)=>{
            res.status(400).json(err)
        })
    
    }

    const login = async (req, res) => {
        const { username, password } = req.body
        userLogin(user, username, password).then((response) => {
            res.status(200).json(response)
        }).catch((err) => {
            res.status(400).json(err)
        })
    }
    return {
        signup,
        login
    }

}

export default authController