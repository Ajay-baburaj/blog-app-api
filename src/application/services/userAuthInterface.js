

export const authServiceInterface = (service)=>{
    const comparePassword =(password,hashedPassword) => service.comparePassword(password,hashedPassword)
    
    const createToken = (user) => service.createToken(user)
    
    const hashedPassword = (password) => service.hashedPassword(password)
    
    const verifyJwt =(token,secretKey)=> service.verifyJwt(token,secretKey)

    return{
        comparePassword,
        createToken,
        hashedPassword,
        verifyJwt
    }
}