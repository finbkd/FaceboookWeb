import express from "express";
import { createComment, fetchComments } from "../controllers/commentController.js";
const router = express.Router();

router.route("/").post(createComment);
router.route("/:postId").get(fetchComments);

export default router;
