import express from "express";
import { createChat, createMessage, fetchChat, fetchMessages, fetchOtherUser, fetchSender } from "../controllers/chatController.js";
const router = express.Router();

router.route("/createMessage").post(createMessage);
router.route("/fetchMessages").get(fetchMessages);
router.route("/fetchSender").get(fetchSender);
router.route("/fetchOtherUser").get(fetchOtherUser);

router.route("/createChat").post(createChat);
router.route("/fetchChat").get(fetchChat);

export default router;
