import mongoose from 'mongoose'
import Comment from '../models/commentModel.js'

export const CommentRepositoryMongoDB = ()=>{
    const createComment = async(data)=>{
        return Comment.create(data)
    }

     const getAllComments = async(postId)=>{
        Comment.aggregate([
            {
                $match:{post:mongoose.Types.ObjectId(postId)}
            },
            {
                $lookup:{
                    from:"User",
                    localField:'commenter',
                    foreignField:"_id",
                    as:'commenterName'

                }
            }
        ])
    }

    return{
        createComment,
        getAllComments
    }
}

