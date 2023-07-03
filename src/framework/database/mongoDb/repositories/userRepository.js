import User from '../models/userModel.js'
export const userRepositoryMongoDB = () =>{

    const getEmail = async(email)=>{
        return await User.findOne({email})
    }

    const getByName = async(username)=>{
        return await User.findOne({username})
    }

    const getById = async(id)=>{
        return await User.findById(id).select({password:0})
    }

    const addUser = async(user)=>{
        return await User.create(user)
    }

    return {
        getEmail,
        getByName,
        getById,
        addUser   
    }
}