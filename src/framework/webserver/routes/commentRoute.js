import express from "express";
import commentController from "../../../adapters/controllers/commentController.js";
import { verifyUser } from "../middlewares/verifyUser.js";

const commentRoutes =()=>{
    const router = express.Router()

    router.post('/add/comment/:id',verifyUser,commentController().createComment)
    router.get('/comments/:id',verifyUser,commentController().getAllComments)
    return router
}

export default commentRoutes