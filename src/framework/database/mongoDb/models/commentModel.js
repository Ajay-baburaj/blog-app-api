import mongoose from "mongoose"
import { Schema } from "mongoose"

const commentSchema = new mongoose.Schema({
    post: {
        type: mongoose.Types.ObjectId,
        ref: 'Post',
        required: true,
    },
    content: {
        type: String,
        required: true,
        min: 1
    },
    commenter: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
}
)

const commentModel = mongoose.model('Comment', commentSchema)
export default commentModel