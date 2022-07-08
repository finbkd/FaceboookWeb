import express from "express";
import bcrypt from "bcryptjs";
const router = express.Router();
import User from "../models/User.js";

//M/ REGISTER
router.post("/register", async (req, res) => {
  try {
    const { userName, email, password } = req.body; //get from body

    //s/ encrypting password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //s/ creating user
    const newUser = await User.create({
      userName,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    res.send(newUser);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

//M/ LOGIN
router.post("/login", async (req, res) => {
  try {
    const { userName, email, password } = req.body; //get from body
    console.log(email);

    //s/ findingUser
    const existingUser = await User.findOne({
      email,
    });

    if (!existingUser) {
      res.status(404).json("User not found");
      return;
    }
    const validPassword = await bcrypt.compare(password, existingUser.password);
    if (!validPassword) {
      res.status(400).json("wrong password");
      return;
    }

    res.send(existingUser);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

export default router;
