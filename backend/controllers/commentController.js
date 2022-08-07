import asyncHandler from "express-async-handler";
import Comment from "../models/Comment.js";
import Post from "../models/Post.js";
import User from "../models/User.js";

export const createComment = asyncHandler(async (req, res) => {
  try {
    const { userId, postId, comment } = req.body;
    const userData = await User.findOne({ _id: userId });
    const { profilePicture, userName } = userData;
    const data = await Comment.create({ userId, postId, comment, profilePicture, userName });
    await Post.updateOne({ _id: postId }, { $push: { Comments: data._id } });
    const postData = await Post.findOne({ _id: postId });
    res.send(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

export const fetchComments = asyncHandler(async (req, res) => {
  try {
    const postId = req.params.postId;
    const postData = await Post.findOne({ _id: postId });

    //b/ fetch user friends from array
    const comments = await Promise.all(
      postData.Comments.map((commentID) => {
        return Comment.findById(commentID);
      })
    );

    // const userCommentData = await Promise.all(
    //   comments.map((comment) => {
    //     return User.findOne({ _id: comment.userId });
    //   })
    // );

    res.send(comments);
  } catch (err) {
    res.status(500).json(err);
  }
});
