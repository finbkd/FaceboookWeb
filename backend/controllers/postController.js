import asyncHandler from "express-async-handler";
import Post from "../models/Post.js";
import User from "../models/User.js";

export const createPost = asyncHandler(async (req, res) => {
  try {
    const newPost = await Post.create(req.body);
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

export const getAllPosts = asyncHandler(async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.userId);

    if (!currentUser) {
      res.status(500).json(err);
    }
    const userPosts = await Post.find({ userId: currentUser._id }).sort({ updatedAt: -1 });
    const friendsposts = await Promise.all(currentUser.friends.map((friend) => Post.find({ userId: friend._id }).sort({ updatedAt: -1 })));
    const allPosts = userPosts.concat(...friendsposts);

    res.json(allPosts);
  } catch (err) {
    res.status(500).json(err);
  }
});

export const getProfilePosts = asyncHandler(async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.userId);

    if (!currentUser) {
      res.status(500).json(err);
    }
    const userPosts = await Post.find({ userId: currentUser._id });
    // const friendsposts = await Promise.all(currentUser.friends.map((friend) => Post.find({ userId: friend._id })));
    // const allPosts = userPosts.concat(...friendsposts);

    res.json(userPosts);
  } catch (err) {
    res.status(500).json(err);
  }
});

export const updatePosts = asyncHandler(async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json("Post has been updated");
    } else {
      res.status(403).json("You can update only your post");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

export const deletePosts = asyncHandler(async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.deleteOne();
      res.status(200).json("Post has been deleted");
    } else {
      res.status(403).json("You can delete only your post");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

export const likePost = asyncHandler(async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      res.status(404).json("Post not found");
    }
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json({ liked: true });
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json({ liked: false });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

export const getPost = asyncHandler(async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

export const getPostByUsername = asyncHandler(async (req, res) => {
  try {
    const user = await User.findOne({ userName: req.params.username });
    const posts = await Post.find({ userId: user._id });
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});
