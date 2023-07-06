

export const postRepository =(postRepo)=>{
    const createPost = (data) =>postRepo.createPost(data)
    const deletePost = (data)=>postRepo.deletePost(data)
    const getPostById =(postId)=>postRepo.getPostById(postId)
    const editPostById = (postId,title,content)=>postRepo.editPostById(postId,title,content)
    const editPostByIdforImage= (postId,title,content,image)=>postRepo.editPostByIdforImage(postId,title,content,image)
    const getAllPosts =(post)=>postRepo.getAllPosts(post)   
    return{
        createPost,
        deletePost,
        getPostById,
        editPostById,
        getAllPosts,
        editPostByIdforImage
    }
}