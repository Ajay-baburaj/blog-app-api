import mongoose from 'mongoose'
import Post from '../models/postModel.js'

export const postRepositoryMongoDB =()=>{
    
    const createPost = async(data)=>{
        return await Post.create(data)
    }

    const deletePost = async(post,userId)=>{
        return Post.findOneAndDelete({ _id: post, author: userId });
    }

    const getPostById = async(postId)=>{
        return await Post.findById(postId)
    }

    const getSinglePost = async (postId) => {
        const postDetails = await Post.aggregate([
          {
            $match: { _id: new mongoose.Types.ObjectId(postId) }
          },
          {
            $lookup: {
              from: 'users',
              localField: 'author',
              foreignField: '_id',
              as: 'authorDetails'
            }
          },
          {
            $project: {
              "authorDetails.password": 0,
              "authorDetails.__v":0,
              "authorDetails.createdDate":0
            }
          },
          {
            $unwind:'$authorDetails'
          },
          {
            $lookup: {
              from: 'comments',
              localField: '_id',
              foreignField: 'post',
              as: 'comments'
            }
          },
          {
            $lookup: {
              from: 'users',
              localField: 'comments.commenter',
              foreignField: '_id',
              as: 'commentedUser'
            }
          },
          {
            $addFields: {
              "comments": {
                $map: {
                  input: "$comments",
                  as: "comment",
                  in: {
                    $mergeObjects: [
                      "$$comment",
                      {
                        $arrayElemAt: [
                          {
                            $filter: {
                              input: "$commentedUser",
                              as: "user",
                              cond: { $eq: ["$$user._id", "$$comment.commenter"] }
                            }
                          },
                          0
                        ]
                      }
                    ]
                  }
                }
              }
            }
          },
          {
            $project: {
              "commentedUser": 0,
              "comments.password":0,
              "comments.createdDate":0,
              "comments.email":0,
              "comments.__v":0,
              "comments.post":0,
              "__v":0,
            }
          }
        ]);
      
        return postDetails;
      };
      

    const editPostById = async(postId,title,content)=>{
      return await Post.findByIdAndUpdate(postId,{title,content},{new:true})   
    }

    const editPostByIdforImage = async(postId,title,content,image)=>{
        return await Post.findByIdAndUpdate(postId,{title,content,image},{new:true})
    }
    
    const deleteCommentsByPostId = async(postId)=>{
        return await Post.deleteMany({post: postId})
    }

    const getAllPosts = async()=>{
        const allpost = await Post.aggregate([
            {
                $lookup:{
                    from:'users',
                    localField:'author',
                    foreignField:'_id',
                    as:'authorDetails'
                }
             },
             {
                $project:{
                    "authorDetails.password": 0
                }
             }
        ])
        return allpost
    }


    return{
        createPost,
        deletePost,
        getPostById,
        editPostById,
        getAllPosts,
        getSinglePost,
        editPostByIdforImage,
        deleteCommentsByPostId
    }
}