import express from "express";
const router = express.Router();

import { greetMe, loginUser, refresh, registerUser } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

//m/ ROUTES
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/refresh").get(refresh);
// router.route("/hi").post(protect, greetMe);

export default router;
