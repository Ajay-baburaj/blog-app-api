import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


export const authServices = () => {
    const comparePassword = (password, hashedPassword) => {
        return bcrypt.compare(password, hashedPassword)
    }
    const hashedPassword = async (password) => {
        return await bcrypt.hash(password,10)
    }

    const createToken = async (user,secret,time) => {
        return jwt.sign({user},secret,{expiresIn:time})
    }

    const verifyJwt = (token, secretKey) => {
        try {
          const decoded = jwt.verify(token, secretKey)
          return {
            message: "Success",
            expired: false,
            data: decoded // Include the decoded data in the response if verification is successful
          };
        } catch (error) {
          if (error instanceof jwt.TokenExpiredError) {
            return {
              message: "Link Expired",
              expired: true,
            }
          } else {
            return {
              message: "Error",
              expired: false, // Set `expired` to false for non-expiry errors
              error: error.message // Include the error message in the response
            }
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
