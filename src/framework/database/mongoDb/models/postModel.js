import mongoose from "mongoose";

const { Schema } = mongoose;

const postSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref:'User',
        required: true,
    },
    title: {
        type: String,
        required: true,
        minlength: 12,
    },
    content: {
        type: String,
        required: true,
        minlength: 12,
    },
    image: String,
    createdAt: {
        type: Date,
        default: Date.now(),
    },
},
    { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
