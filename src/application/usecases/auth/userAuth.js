import bcrypt from 'bcrypt'

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
        const hashedPassword = await service.hashedPassword(password,10)
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
            const token = await service.createToken(data._id,process.env.JWT_SECRET)
            delete data.password
            delete data.id
            data.status = 'success'
            data.message = 'user verified'
            data.token = token
            resolve(data)
        }
    })
}