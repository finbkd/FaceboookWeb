import asyncHandler from "express-async-handler";
import Notification from "../models/Notification.js";
import User from "../models/User.js";

//a/ send notification
export const sendNotification = asyncHandler(async (req, res) => {
  try {
    const { sender, receiver, type } = req.body;
    const senderName = await User.findOne({ userName: sender });
    const receiverName = await User.findOne({ userName: receiver });
    console.log(type);
    if (!senderName || !receiverName) {
      throw new Error("Wrong credentials");
    }
    let contentData;
    if (type === "Accepted friend Request") {
      contentData = `${sender} accepted your friend Request!`;
      await Notification.deleteOne({ sender: receiverName.userName, receiver: senderName.userName, type: "Received friend Request" });
    }
    if (type === "Rejected friend Request") {
      console.log(receiverName.userName, senderName.userName);
      await Notification.deleteOne({ sender: receiverName.userName, receiver: senderName.userName, type: "Received friend Request" });
      res.send("done");
      return;
    }
    if (type === "liked") {
      contentData = `${sender} liked your post!`;
    }
    if (type === "Received friend Request") {
      contentData = `${sender} wants to be your friend!`;
    }
    if (type === "commented") {
      contentData = `${sender} commented on your post!`;
    }

    const notificationData = await Notification.create({ sender, receiver, content: contentData, type, senderProfilePic: senderName.profilePicture });
    await User.updateOne({ userName: receiver }, { $push: { notifications: notificationData._id } });

    res.status(200).json(notificationData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//a/ receive all notficaitons
export const receiveNotifications = async (req, res) => {
  try {
    const { receiver } = req.body;
    const receiverName = await User.findOne({ userName: receiver });
    const data = await Notification.find({ receiver: receiverName.userName, sender: { $ne: receiverName.userName }, type: { $ne: "Received friend Request" } }).sort({ createdAt: -1 });
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const receiveFriendRequest = asyncHandler(async (req, res) => {
  const { receiver } = req.body;
  const receiverName = await User.findOne({ userName: receiver });
  const data = await Notification.find({ receiver: receiverName.userName, sender: { $ne: receiverName.userName }, type: "Received friend Request" }).sort({ createdAt: -1 });
  res.status(200).json(data);
});

export const unReadNotifications = asyncHandler(async (req, res) => {
  const { receiver } = req.body;
  const receiverName = await User.findOne({ userName: receiver });
  const data = await Notification.find({ receiver: receiverName.userName, isRead: false, sender: { $ne: receiverName.userName }, type: { $ne: "Received friend Request" } }).sort({ createdAt: -1 });
  res.status(200).json(data);
});

export const readNotifications = asyncHandler(async (req, res) => {
  const { receiver } = req.body;
  const receiverName = await User.findOne({ userName: receiver });
  const data = await Notification.updateMany({ receiver: receiverName.userName, isRead: false, sender: { $ne: receiverName.userName }, type: { $ne: "Received friend Request" } }, { $set: { isRead: true } }).sort({ createdAt: -1 });
  res.status(200).json(data);
});

export const unReadFriendRequests = asyncHandler(async (req, res) => {
  const { receiver } = req.body;
  const receiverName = await User.findOne({ userName: receiver });
  const data = await Notification.find({ receiver: receiverName.userName, isRead: false, sender: { $ne: receiverName.userName }, type: "Received friend Request" }).sort({ createdAt: -1 });
  res.status(200).json(data);
});

export const readFriendRequests = asyncHandler(async (req, res) => {
  const { receiver } = req.body;
  const receiverName = await User.findOne({ userName: receiver });
  const data = await Notification.updateMany({ receiver: receiverName.userName, sender: { $ne: receiverName.userName }, type: "Received friend Request" }, { $set: { isRead: true } }).sort({ createdAt: -1 });
  res.status(200).json(data);
});

export const deleteNotification = asyncHandler(async (req, res) => {
  const { sender, receiver } = req.body;
  const receiverName = await User.deleteOne({ sender, receiver, type: "Received friend Request" });
  res.status(200).json("done");
});
