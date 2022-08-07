import express from "express";
import { readFriendRequests, readNotifications, receiveFriendRequest, receiveNotifications, sendNotification, unReadFriendRequests, unReadNotifications } from "../controllers/notificationController.js";

const router = express.Router();

router.route("/sendRequest").post(sendNotification);
router.route("/receiveRequest").post(receiveNotifications);
router.route("/receivefrndRequest").post(receiveFriendRequest);
router.route("/unReadNotifications").post(unReadNotifications);
router.route("/readNotifications").post(readNotifications);
router.route("/unReadFriendRequests").post(unReadFriendRequests);
router.route("/readfriendrequests").post(readFriendRequests);
router.route("/deleteNotification").post(readFriendRequests);

export default router;
