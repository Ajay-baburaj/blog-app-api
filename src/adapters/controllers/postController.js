import { response } from "express"
import { postRepository } from "../../application/repository/postInterface.js"
import { userRepository } from "../../application/repository/userInterface.js"
import { s3serviceInterface } from "../../application/services/s3serviceInterface.js"
import { createBlogPost, deleteBlogPost, editBlogPost, getAllBlogPost, getSinglePost } from "../../application/usecases/post/blogPost.js"
import { postRepositoryMongoDB } from "../../framework/database/mongoDb/repositories/postRepository.js"
import { userRepositoryMongoDB } from "../../framework/database/mongoDb/repositories/userRepository.js"
import { s3services } from "../../framework/services/s3services.js"
import AppError from "../../utils/appError.js"
import HttpStatus from "../../utils/httpStatus.js"


const postController = () => {
    const post = postRepository(postRepositoryMongoDB())
    const user = userRepository(userRepositoryMongoDB())
    const s3service = s3serviceInterface(s3services())

    const createPost = async (req, res, next) => {
        createBlogPost(req.userId, req.body, req.files[0], post, s3service, user).then((response) => {
            res.status(200).json(response)
        }).catch((err) => {
            next(new AppError(err.message, HttpStatus.UNAUTHORIZED))
        })
    }
    const getSingleBlog = async (req, res, next) => {
        getSinglePost(req.userId, req.params.id, post, s3service, user).then((response) => {
            res.status(200).json(response)
        }).catch((err) => {
            next(new AppError(err.message, HttpStatus.UNAUTHORIZED))
        })
    }

    const deletePost = async (req, res, next) => {
        deleteBlogPost(req.userId, req.params.id, post, s3service).then((response) => {
            res.status(200).json(response)
        }).catch((err) => {
            next(new AppError(err.message, HttpStatus.UNAUTHORIZED))
        })
    }

    const editPost = async(req,res,next)=>{
        const postId = req.params.id
        const {title,content} = req.body
        editBlogPost(postId,content,title,req?.files?.length != 0 ? req.files[0]: undefined,post,s3service).then((response)=>{
            res.status(200).json(response)
        }).catch((err)=>{
            next(new AppError(err.message,HttpStatus.UNAUTHORIZED))
        })
    }

    const getAllPost = async(req,res,next)=>{
        getAllBlogPost(post).then((response)=>{
            res.status(200).json(response)
        }).catch((err)=>{
            next(new AppError(err.message,HttpStatus.UNAUTHORIZED))
        })
    }

    return {
        createPost,
        deletePost,
        getSingleBlog,
        editPost,
        getAllPost
    }
}

export default postController