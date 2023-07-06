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

    const editPostById = async(postId,title,content)=>{
      return await Post.findByIdAndUpdate(postId,{title,content},{new:true})   
    }

    const editPostByIdforImage = async(postId,title,content,image)=>{
        return await Post.findByIdAndUpdate(postId,{title,content,image},{new:true})
    }

    const getAllPosts = async()=>{
        return await Post.find()
    }

    return{
        createPost,
        deletePost,
        getPostById,
        editPostById,
        getAllPosts,
        editPostByIdforImage
    }
}