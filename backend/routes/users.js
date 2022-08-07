import express from "express";
import { fetchFriends, fetchUser, fetchUsers, searchUsers, setOnline, updateUser } from "../controllers/userController.js";

const router = express.Router();

router.route("/friends/:userId").get(fetchFriends);
router.get("/", fetchUser);
router.post("/allUsers", fetchUsers);
router.put("/:id", updateUser);
router.post("/online", setOnline);
router.post("/searchUser", searchUsers);

export default router;
