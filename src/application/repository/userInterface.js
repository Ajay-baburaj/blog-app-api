
export const userRepository = (userRepo)=>{
    
    const getEmail = (email)=> userRepo.getEmail(email)
    const getByName = (username) =>userRepo.getByName(username)
    const addUser = (data) =>userRepo.addUser(data)

    return{
        getEmail,
        getByName,
        addUser
    }}