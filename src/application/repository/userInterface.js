
export const userRepository = (userRepo)=>{
    
    const getEmail = (email)=> userRepo.getEmail(email)
    const getByName = (username) =>userRepo.getByName(username)
    const addUser = (data) =>userRepo.addUser(data)
    const getById = (userId) => userRepo.getById(userId)

    return{
        getEmail,
        getByName,
        addUser,
        getById
    }}