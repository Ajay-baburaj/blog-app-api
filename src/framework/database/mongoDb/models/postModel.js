import mongoose from "mongoose";

const { Schema } = mongoose;

const postSchema = new Schema({
    author: {
        type: String,
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
    images: [
        {
            type: String,
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now(),
    },
},
    { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
