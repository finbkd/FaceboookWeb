import express from "express";
import { cancelRequest, fetchRequest, isRequestReceived, isRequestSent, respondRequest, sendRequest, unfriendRequest } from "../controllers/friendRequestController.js";
const router = express.Router();

router.route("/send").post(sendRequest);
router.route("/respond/:response").post(respondRequest);
router.route("/requests/").get(fetchRequest);
router.route("/isrequestsent").post(isRequestSent);
router.route("/isrequestreceived").post(isRequestReceived);
router.route("/cancelrequest").post(cancelRequest);
router.route("/unfriend").post(unfriendRequest);

export default router;
