import asyncHandler from "express-async-handler";
import { Chat } from "../models/Chat.js";

import Message from "../models/Message.js";

//a/ MESSAGE
export const createMessage = asyncHandler(async (req, res) => {
  try {
    const { sender, content, chatId } = req.body;
    const newPost = await (await Message.create({ sender, content, chatId })).populate("sender");
    // const data = await Chat.findOne({ _id: newPost.chatId });

    const data = await Chat.updateOne({ _id: newPost.chatId }, { $set: { latestMessage: newPost.content } });
    res.status(200).json(newPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

export const fetchMessages = asyncHandler(async (req, res) => {
  try {
    const { chatId } = req.query;
    const fetchMessages = await Message.find({ chatId }).populate("sender");
    res.status(200).json(fetchMessages);
  } catch (err) {
    res.status(500).json(err);
  }
});

//a/ CHATS
export const createChat = asyncHandler(async (req, res) => {
  const { users } = req.body;
  const user1 = users[0];
  const user2 = users[1];
  const existingChat1 = await Chat.findOne({ users: [user1, user2] });
  const existingChat2 = await Chat.findOne({ users: [user2, user1] });
  if (existingChat1) {
    res.send({ content: "Chat already exists", _id: existingChat1._id });
    return;
  }
  if (existingChat2) {
    res.send({ content: "Chat already exists", _id: existingChat2._id });
    return;
  }

  const newChat = await Chat.create({ users });

  res.send(newChat);
});

export const fetchChat = asyncHandler(async (req, res) => {
  try {
    const { chatId } = req.query;
    const fetchUser = await Chat.find({ _id: chatId }).populate("users");

    res.json(fetchUser);
  } catch (err) {}
});

export const fetchSender = asyncHandler(async (req, res) => {
  const { chatId } = req.query;
  const fetchSender = await Message.find({ chatId }, { sender: 1 }).populate("sender");
  res.status(200).json(fetchSender);
});

export const fetchOtherUser = asyncHandler(async (req, res) => {
  const { userId } = req.query;
  const fetchUser = await Chat.find({ users: userId }).populate("users");
  //b/ aggregation pipeline
  // const fetchUser = await Chat.aggregate([
  //   {
  //     $match: { users: userId },
  //   },
  // ]);

  res.send(fetchUser);
});
