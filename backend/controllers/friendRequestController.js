import asyncHandler from "express-async-handler";
import Post from "../models/Post.js";
import User from "../models/User.js";
import FriendRequest from "../models/FriendRequest.js";
import { request } from "express";

//a/ SEND REQUEST
export const sendRequest = asyncHandler(async (req, res) => {
  //b/ take info from body of user and user to send it
  const { requestTo, requestFrom, status } = req.body;
  if (!requestTo || !requestFrom) {
    throw new Error("Not all details mentioned");
  }

  //b/ add each other in friendship array
  const sender = await User.findOne({ _id: requestFrom });
  const receiver = await User.findOne({ _id: requestTo });

  if (sender.friends.includes(requestTo)) {
    throw new Error("Already a friend");
  }

  const sameRequest = await FriendRequest.findOne({ requestFrom: requestFrom, requestTo: requestTo });
  if (sameRequest) {
    throw new Error("Request already sent");
  }

  //b/ send the request with requested status
  const data = await FriendRequest.create({ requestTo, requestFrom, status });
  res.send("Request sent");
});

//a/ SEND RESPONSE
export const respondRequest = asyncHandler(async (req, res) => {
  const { requestFrom, requestTo } = req.body;
  const { response } = req.params;

  //s/ validate request
  if (response !== "accept" && response !== "reject") {
    throw new Error("Not a vallid response");
  }

  const requestId = await FriendRequest.findOne({ requestFrom, requestTo });

  const requestIdExist = await FriendRequest.findOne({ _id: requestId });
  if (!requestIdExist) {
    throw new Error("Invalid request Id");
  }

  //s/ update change status of request in requestDB
  if (response === "accept") {
    await FriendRequest.updateOne({ _id: requestId }, { status: "accepted" });

    // findUserId of receiver and sender
    const friendData = await FriendRequest.findOne({ _id: requestId });
    const { requestFrom, requestTo } = friendData;

    //add each other in friendship array
    const sender = await User.findOne({ _id: requestFrom });
    const receiver = await User.findOne({ _id: requestTo });

    if (sender.friends.includes(requestTo)) {
      throw new Error("Already a friend");
    }
    sender.friends.push(requestTo);
    receiver.friends.push(requestFrom);

    // update database
    await User.updateOne({ _id: requestFrom }, { $set: { friends: sender.friends } });
    await User.updateOne({ _id: requestTo }, { $set: { friends: receiver.friends } });

    await FriendRequest.deleteOne({ _id: requestId });
  } else if (response === "reject") {
    await FriendRequest.deleteOne({ _id: requestId });
  }

  res.send("response sent");
});

//a/ FETCH REQUEST
export const fetchRequest = asyncHandler(async (req, res) => {
  const { requestToId: receiverID } = req.body;
  const requests = await FriendRequest.find({ requestTo: receiverID });
  console.log(requests);
  res.send(requests);
});

export const isRequestSent = asyncHandler(async (req, res) => {
  const { requestTo, requestFrom } = req.body;
  const status = await FriendRequest.findOne({ requestFrom, requestTo });
  if (status) {
    res.send(true);
    return;
  }
  res.send(false);
});

export const isRequestReceived = asyncHandler(async (req, res) => {
  const { requestTo, requestFrom } = req.body;
  const status = await FriendRequest.findOne({ requestFrom, requestTo });
  if (status) {
    res.send(true);
    return;
  }
  res.send(false);
});

export const cancelRequest = asyncHandler(async (req, res) => {
  const { requestTo, requestFrom } = req.body;
  const status = await FriendRequest.deleteOne({ requestFrom, requestTo });
  res.send("request cancelled");
});

//a/ UNFRIEND
export const unfriendRequest = asyncHandler(async (req, res) => {
  const { requestFrom, requestTo } = req.body;

  //s/ update change status of request in requestDB
  //add each other in friendship array
  const sender = await User.findOne({ _id: requestFrom });
  const receiver = await User.findOne({ _id: requestTo });

  if (sender.friends.includes(requestTo)) {
    const data1 = sender.friends.filter((f) => f.toString() !== requestTo);
    const data2 = receiver.friends.filter((f) => f.toString() !== requestFrom);

    await User.updateOne({ _id: requestFrom }, { $set: { friends: data1 } });
    await User.updateOne({ _id: requestTo }, { $set: { friends: data2 } });
  }

  res.send("response sent");
});
