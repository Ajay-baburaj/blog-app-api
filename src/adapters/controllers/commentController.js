import { commentRepository } from "../../application/repository/commentInterface.js"
import { createBlogComment, getAllBlogComments } from "../../application/usecases/comment/blogComment.js"
import { CommentRepositoryMongoDB } from "../../framework/database/mongoDb/repositories/commentReposiory.js"
import AppError from "../../utils/appError.js"
import HttpStatus from "../../utils/httpStatus.js"


const commentController =()=>{
    const comment = commentRepository(CommentRepositoryMongoDB())

    const createComment = async(req,res,next)=>{
        const postId = req.params.id
        const {content} = req.body
        createBlogComment(req.userId,postId,content,comment).then((response)=>{
            res.status(200).json(response)
        }).catch((err)=>{
            next(new AppError(err.message,HttpStatus.UNAUTHORIZED))
        })
    }

    const getAllComments = async(req,res,next)=>{
        const postId = req.params.id
        getAllBlogComments(postId,comment).then((response)=>{
            res.status(200).json(response)
        }).catch((err)=>{
            next(new AppError(err.message,HttpStatus.UNAUTHORIZED))
        })
    }

    return{
        createComment,
        getAllComments
    }
}

export default commentController