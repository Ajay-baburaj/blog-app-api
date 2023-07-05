
export const commentRepository =(commentRepo)=>{
    const createComment = (data)=> commentRepo.createComment(data)
    const getSingleComment = (postId) =>commentRepo.getSingleComment(postId)
    const getAllComments =(postId) =>commentRepo.getAllComments(postId)
    return{
        createComment,
        getSingleComment,
        getAllComments
    }
}