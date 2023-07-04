import Post from '../models/postModel.js'
import User from '../models/userModel.js'

export const postRepositoryMongoDB =()=>{
    
    const createPost = async(data)=>{
        return Post.create(data)
    }

    return{
        createPost
    }
}