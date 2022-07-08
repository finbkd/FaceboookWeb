import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
const router = express.Router();

//m/ GET FRIENDS
router.get("/friends/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const friends = await Promise.all(
      user.followings.map((friendId) => {
        return User.findById(friendId);
      })
    );
    // console.log("friends", friends);
    let friendList = [];
    friends.map((friend) => {
      const { _id, userName, profilePicture } = friend;
      friendList.push({ _id, userName, profilePicture });
    });
    res.status(200).json({ friendList });
  } catch (err) {
    console.log(err);
  }
});

//m/ UPDATE USER
router.put("/:id", async (req, res) => {
  // body is user interface whereas params is url.
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        hashedPassword = await bcrypt.hash(req.body.password, salt);
      } catch (err) {
        return res.status(500).json(err);
      }
    }
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body, //update password to new hashed password
      });
      res.status(200).send("Account has been updated");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You can only update your own account");
  }
});

//m/ DELETE USER
router.delete("/:id", async (req, res) => {
  // body is user interface whereas params is url.
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      const user = await User.deleteOne({ _id: req.params.id });
      res.status(200).json("Account has been deleted");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(500).json("You can only delete your account");
  }
});

//m/ FOLLOW A USER
router.put("/:id/follow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id); //id can of any person
      const currentUser = await User.findById(req.body.userId); //id of loggedIN person

      //s/ check if loggedIn person is already a follower
      if (!user.followers.includes(req.body.userId)) {
        // push follower and follwing to respective users
        await user.updateOne({ $push: { followers: req.body.userId } });
        await currentUser.updateOne({ $push: { followings: req.params.id } });
        res.status(200).json("User has been followed");
      } else {
        res.status(403).json("You already follow this user");
      }
    } catch (err) {
      console.log(err);
      res.status(500).json("You cant follow yourself");
    }
  }
});

//m/ UNFOLLOW AN USER
router.put("/:id/unfollow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id); //id can of any person
      const currentUser = await User.findById(req.body.userId); //id of loggedIN person

      //s/ check if loggedIn person is already a follower
      if (user.followers.includes(req.body.userId)) {
        // ppull follower and follwing to respective users
        await user.updateOne({ $pull: { followers: req.body.userId } });
        await currentUser.updateOne({ $pull: { followings: req.params.id } });
        res.status(200).json("User has been unfollowed");
      } else {
        res.status(403).json("You already dont follow this user");
      }
    } catch (err) {
      console.log(err);
      res.status(500).json("You cant follow yourself");
    }
  }
});

//m/ GET USER
router.get("/", async (req, res) => {
  const userId = req.query.userId;
  const username = req.query.userName;
  try {
    const user = userId ? await User.findById(userId) : await User.findOne({ userName: username });
    const { password, updatedAt, ...other } = user._doc; //to hide password, updateAt in response
    res.status(200).json(other);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
