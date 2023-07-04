import express from "express"
import postController from "../../../adapters/controllers/postController.js"
import multerMiddleWare from "../middlewares/multer.js"
import { verifyUser } from "../middlewares/verifyUser.js"

const postRoutes = () => {
    const router = express.Router()
    router.post('/create/post',verifyUser,multerMiddleWare().upload.single('image'),
        postController().createPost)

    return router
}

export default postRoutes