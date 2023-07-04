import mongoose from 'mongoose'
import Post from '../models/postModel.js'

export const postRepositoryMongoDB =()=>{
    
    const createPost = async(data)=>{
        return Post.create(data)
    }

    const deletePost = async(filter)=>{
        return Post.deleteOne(filter)
    }

    const updatePost = async()=>{

    }

    const getAllPost = ()=>{
        return Post.find({})
    }

    return{
        createPost,
        deletePost,
    }
}