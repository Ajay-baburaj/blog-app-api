import mongoose from 'mongoose'
import Post from '../models/postModel.js'

export const postRepositoryMongoDB =()=>{
    
    const createPost = async(data)=>{
        return await Post.create(data)
    }

    const deletePost = async(filter)=>{
        return Post.deleteOne(filter)
    }

    const getPostById = async(postId)=>{
        return await Post.findById(postId)
    }

    const updatePost = async(postId,title,content)=>{
      return await Post.findByIdAndUpdate(postId,{title,content},{new:true})   
    }

    

    return{
        createPost,
        deletePost,
        getPostById,
        updatePost
    }
}