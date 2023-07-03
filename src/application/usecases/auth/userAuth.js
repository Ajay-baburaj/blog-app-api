import bcrypt from 'bcrypt'

export const userSignUp = (userRepository,username,email,password) => {
    console.log(password)
    return new Promise(async (resolve, reject) => {

        const [emailValid, usernameValid] = await Promise.all([
            userRepository.getEmail(email),
            userRepository.getByName(username)
        ]);

        if (emailValid) {
            reject({ message: 'email already registered' })
        }
        if (usernameValid) {
            reject({ message: 'username already exists' })
        }
        const hashedPassword = await bcrypt.hash(password, 10)
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

export const userLogin = (userRepository, username, password) => {
    console.log(username,password)
    return new Promise(async (resolve, reject) => {
        const userCheck = await userRepository.getByName(username)
        const passwordCheck = await bcrypt.compare(password,userCheck.password)
        if (!userCheck) {
            reject({ message: 'invalid username' })
        }
        if (!passwordCheck) {
            reject({ message: 'invalid password' })
        }

        if (password && userCheck) {
            const data = userCheck.toObject({ getters: true, versionKey: false });
            delete data.password;
            delete data.id
            resolve(data)
        }
    })
}