export const createBlogPost =(userId,postObj,file,postRepository,s3service,userRepository)=>{
    return new Promise(async(resolve,reject)=>{
        const userData = await userRepository.getById(userId)
        console.log(userData)
    })
}