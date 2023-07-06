

export const postRepository =(postRepo)=>{
    const createPost = (data) =>postRepo.createPost(data)
    const deletePost = (postId,userId)=>postRepo.deletePost(postId,userId)
    const getPostById =(postId)=>postRepo.getPostById(postId)
    const editPostById = (postId,title,content)=>postRepo.editPostById(postId,title,content)
    const editPostByIdforImage= (postId,title,content,image)=>postRepo.editPostByIdforImage(postId,title,content,image)
    const getAllPosts =(post)=>postRepo.getAllPosts(post) 
    const getSinglePost =(postId) => postRepo.getSinglePost(postId)
    const deleteCommentsByPostId =(postId)=>postRepo.deleteCommentsByPostId(postId)  
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