import express from "express"
import postController from "../../../adapters/controllers/postController.js"
import multerMiddleWare from "../middlewares/multer.js"
import { verifyUser } from "../middlewares/verifyUser.js"

const postRoutes = () => {
    const router = express.Router()
    router.post('/create/post',verifyUser,multerMiddleWare().upload.any('image'),
        postController().createPost)
    router.delete('/delete/post/:id',verifyUser,postController().deletePost)
    router.get('/post/:id',verifyUser,postController().getSingleBlog)
    router.put('/edit/post/:id',multerMiddleWare().upload.any('image'),verifyUser,postController().editPost)
    router.get('/all/posts',verifyUser,postController().getAllPost)    

    return router
}

export default postRoutes