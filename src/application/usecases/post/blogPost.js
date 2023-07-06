import mongoose from "mongoose"

export const createBlogPost = (userId, postObj, file, postRepository, s3service, userRepository) => {
  return new Promise(async (resolve, reject) => {
    const userData = await userRepository.getById(userId)
    await s3service.uploadTos3(file).then(async (image) => {
      postObj.author = new mongoose.Types.ObjectId(userId);
      postObj.image = image
      const inserted = await postRepository.createPost({ ...postObj })
      const imgUrl = await s3service.getFromS3(image)
      const post = inserted.toObject()
      post.image = imgUrl //to display image in the frontend
      post.authorName = userData.username //to display username in the frontend
      resolve(post)
    }).catch((err) => {
      reject(err)
    })
  })
}

export const getSinglePost = (userId, postId, postRepository, s3service, userRepository) => {
  return new Promise(async (resolve, reject) => {
    const fetched = await postRepository.getPostById(postId)
    const userData = await userRepository.getById(userId)
    const imgUrl = await s3service.getFromS3(fetched.image)
    const post = fetched.toObject()
    post.image = imgUrl //to display image in the frontend
    post.authorName = userData.username //to display username in the frontend
    resolve(post)
  }).catch((err) => {
    reject(err)
  })
}


export const deleteBlogPost = (userId, postId, postRepository, s3service) => {
  return new Promise(async (resolve, reject) => {
    try {
      const post = await postRepository.getPostById(postId);
      const deleted = await s3service.deleteFromS3(post.image);
      const deletedPost = await postRepository.deletePost({
        _id: new mongoose.Types.ObjectId(postId),
        author: new mongoose.Types.ObjectId(userId),
      });
      resolve(deletedPost);
    } catch (err) {
      reject(err);
    }
  })
}

export const editBlogPost = (postId, content, title, image, postRepository, s3service) => {
  return new Promise(async (resolve, reject) => {
    if (image) {
      try {
        const post = await postRepository.getPostById(postId)
        const deleted = await s3service.deleteFromS3(post.image)
        const newImage = await s3service.uploadTos3(image)
        const edit = await postRepository.editPostByIdforImage(postId, content, title, newImage)
        const imgUrl = await s3service.getFromS3(edit.image)
        const editedPost = edit.toObject()
        editedPost.image = imgUrl
        resolve(editedPost)
      } catch (err) {
        reject(err)
      }
    } else {
      try {
        const edit = await postRepository.editPostById(postId, title, content)
        resolve(edit)
      } catch (err) {
        reject(err)
      }
    }
  })
}

export const getAllBlogPost = (postRepository)=>{
  return new Promise(async(resolve,reject)=>{
    try{
      const getPosts = await postRepository.getAllPosts()
      resolve(getPosts)
    }catch(err){
      reject(err)
    }
  })
}

