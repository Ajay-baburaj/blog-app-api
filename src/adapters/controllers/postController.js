import { postRepository } from "../../application/repository/postInterface.js"
import { userRepository } from "../../application/repository/userInterface.js"
import { s3serviceInterface } from "../../application/services/s3serviceInterface.js"
import { createBlogPost } from "../../application/usecases/post/blogPost.js"
import { postRepositoryMongoDB } from "../../framework/database/mongoDb/repositories/postRepository.js"
import { userRepositoryMongoDB } from "../../framework/database/mongoDb/repositories/userRepository.js"
import { s3services } from "../../framework/services/s3services.js"


const postController =()=>{
    const post = postRepository(postRepositoryMongoDB())
    const user = userRepository(userRepositoryMongoDB())
    const s3service = s3serviceInterface(s3services())

    const createPost =async(req,res)=>{
        createBlogPost(req.userId,req.body,req.file,post,s3service,user).then((response)=>{
            console.log(response)
        }).catch((err)=>{
            console.log(err.message)
        })
    }

    return{
        createPost
    }
}

export default postController