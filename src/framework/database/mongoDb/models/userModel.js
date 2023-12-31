import mongoose from "mongoose";

const { Schema, model } = mongoose;

const userSchema = new Schema({
    username: {
      type: String,
      required: true,
      minlength: 4,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    }
  },
  { timestamps: true }
);

const User = model("User", userSchema);

export default User;
