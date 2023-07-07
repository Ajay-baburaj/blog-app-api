import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
dotenv.config()

export const userSignUp = (userRepository,username,email,password,service) => {
    return new Promise(async (resolve, reject) => {
        const [emailValid, usernameValid] = await Promise.all([
            userRepository.getEmail(email),
            userRepository.getByName(username)
        ]);

        if (emailValid) {
            reject({ message: 'email already registered' })
            return
        }
        if (usernameValid) {
            reject({ message: 'username already exists' })
            return
        }
        const hashedPassword = await service.hashedPassword(password)
        const data = await userRepository.addUser({
            email,
            username,
            password: hashedPassword
        });
        const responseData = data.toObject({ getters: true, versionKey: false });
        delete responseData.password;
        delete responseData.id
        resolve(responseData)
    })
}

export const userLogin = (userRepository, username, password,service) => {
    return new Promise(async (resolve, reject) => {
        const userCheck = await userRepository.getByName(username)
        if (!userCheck) {
            reject({ message: 'invalid username' })
            return
        }
        const passwordCheck = await bcrypt.compare(password,userCheck.password)
        if (!passwordCheck) {
            reject({ message: 'invalid password' })
            return
        }

        if (password && userCheck) {
            const data = userCheck.toObject({ getters: true, versionKey: false })
            const token = await service.createToken(data._id,process.env.JWT_SECRET,"1d")
            const refreshToken = await service.createToken(data._id,process.env.REFRESH_SECRET,"5d")
            delete data.password
            delete data.id
            data.status = 'success'
            data.message = 'user verified'
            data.token = token
            data.refreshToken = refreshToken
            resolve(data)
        }
    })
}

export const generateAccesTokenFromRefresh = (refreshToken,service) =>{
    return new Promise(async(resolve,reject)=>{
        const {expired,message,data} = await service.verifyJwt(refreshToken,process.env.REFRESH_SECRET)
        if(!expired && message === 'Success'){
            const newToken = await service.createToken(data.user,process.env.JWT_SECRET,"1d")
            resolve({status:"Success",message:"new access token generated",token:newToken})
        }else{
            reject({status:false,message:'Invalid Token'})
        }

    })
}