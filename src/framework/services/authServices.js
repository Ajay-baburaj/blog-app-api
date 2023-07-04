import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


export const authServices = () => {
    const comparePassword = (password, hashedPassword) => {
        return bcrypt.compare(password, hashedPassword)
    }
    const hashedPassword = async (password) => {
        return await bcrypt.hash(password, 10)
    }

    const createToken = async (user) => {
        return jwt.sign({user},process.env.JWT_SECRET,{expiresIn:'2d'})
    }

    const verifyJwt = (token, secretKey) => {
        try {
            return jwt.verify(token, secretKey)
        } catch (error) {
            return {
                message: "Link Expired",
                expired: true,
            }

        }
    }
    return {
        comparePassword,
        createToken,
        hashedPassword,
        verifyJwt
    }

}
