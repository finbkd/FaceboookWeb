import mongoose from "mongoose";
const commentSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
    },
    profilePicture: {
      type: String,
    },
    postId: {
      type: String,
      max: 500,
    },
    comment: {
      type: "string",
    },
    likes: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
