export const createBlogComment = (userId,postId,content,commentRepository) => {
    return new Promise(async (resolve, reject) => {
      try {
        const commentObj = {
            post:postId,
            content,
            commenter:userId,
        }
        const comment = await commentRepository.createComment({ ...commentObj })
        const updatedComment = await commentRepository.getSingleComment(comment._id)
        resolve(updatedComment[0]);
      } catch (err) {
        reject(err);
      }
    })
  }

  export const getAllBlogComments = (postId,commentRepository)=>{
    return new Promise(async(resolve,reject)=>{
        try{
            const comments = await commentRepository.getAllComments(postId)
            resolve(comments)
        }catch(err){
            reject(err)
        }
    })
  }
  