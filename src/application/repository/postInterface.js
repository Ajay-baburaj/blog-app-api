

export const postRepository =(postRepo)=>{
    const createPost = (data) =>postRepo.createPost(data)
    const deletePost = (data)=>postRepo.deletePost(data)
    return{
        createPost,
        deletePost
    }
}