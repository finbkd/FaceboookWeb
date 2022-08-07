import express from "express";
import { createPost, deletePosts, getAllPosts, getPost, getPostByUsername, getProfilePosts, likePost, updatePosts } from "../controllers/postController.js";
const router = express.Router();

//M/ CREATE A POST
router.route("/create").post(createPost);

//M/ GET A TIMELINE POSTS OF PAGE THAT WE ARE VISITING
router.route("/timeline/:userId").get(getAllPosts);

//M/ GET A TIMELINE POSTS OF PAGE THAT WE ARE VISITING
router.route("/profile/:userId").get(getProfilePosts);

//M/ LIKE A POST
router.put("/:id/like", likePost);

//M/ GET A POST
router.route("/:id").get(getPost);

// //M/ UPDATE A POST
// router.put("/:id", updatePosts);

// //M/ DELETE A POST
// router.delete("/:id", deletePosts);

// router.get("/profile/:username", getPostByUsername);

export default router;
