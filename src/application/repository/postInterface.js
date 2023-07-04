

export const postRepository =(postRepo)=>{
    const createPost = (data) =>postRepo.createPost(data)
    return{
        createPost
    }
}