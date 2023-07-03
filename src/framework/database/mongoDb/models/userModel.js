import mongoose from "mongoose";
import { Schema, model } from "mongoose";

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        min: 4,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: truea
    },
    password: {
        type: String,
        required: true,
        min: 6
    },
    avatar: {
        type: String,
    },
    createdDate: {
        type: Date,
        default: Date.now()
    }
})

const UserModel = model('User', userSchema)
export default userSchema