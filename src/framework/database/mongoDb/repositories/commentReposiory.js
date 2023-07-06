import Comment from '../models/commentModel.js'

export const CommentRepositoryMongoDB = () => {
    const createComment = async (data) => {
        return Comment.create(data)
    }

    const getSingleComment = async (commentId) => {
        try {
            const data = await Comment.find({ _id: commentId })
                .populate('commenter', '-password')  // Populate the 'commenter' field from the 'User' collection, excluding the 'password' field
                .exec();    // so that commenter can show their username in frontend            

            return data;
        } catch (err) {
            console.log(err.message);
        }
    }

    const getAllComments = async (postId) => {
        try {
            const comment = await Comment.find({ post: postId })
                .populate('commenter', '-password')  // Populate the 'commenter' field from the 'User' collection, excluding the 'password' field
                //.populate('post')  so that commenter can show their username in frontend,
                .exec() // also populated post to show it on the frontend   
            return comment
        } catch (err) {
            next(err)
        }
    }

    return {
        createComment,
        getSingleComment,
        getAllComments
    }
}

