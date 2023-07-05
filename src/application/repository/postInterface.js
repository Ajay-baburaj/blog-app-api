

export const postRepository =(postRepo)=>{
    const createPost = (data) =>postRepo.createPost(data)
    const deletePost = (data)=>postRepo.deletePost(data)
    const getPostById =(postId)=>postRepo.getPostById(postId)
    return{
        createPost,
        deletePost,
        getPostById
    }
}