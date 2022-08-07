import bcrypt from "bcryptjs";
import asyncHandler from "express-async-handler";

import { findRefreshToken, generateTokens, storeRefreshTokenDB, updateRefreshToken, validateRefreshToken } from "../services/token-service.js";
import User from "../models/User.js";

export const registerUser = asyncHandler(async (req, res) => {
  try {
    const { userName, email, password, profilePicture, coverPicture } = req.body; //get from body

    //s/ creating user
    const newUser = await User.create({
      userName,
      email,
      password,
      profilePicture,
      coverPicture,
    });

    //s/ Generate Tokens
    const { accessToken, refreshToken } = await generateTokens({ _id: newUser._id });
    //s/ store refrehsTOken in DB
    await storeRefreshTokenDB(newUser._id, refreshToken);

    //s/ store it in cookies
    res.cookie("refreshToken", refreshToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true,
      // secure: true,
    });
    res.cookie("accessToken", accessToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true,
      // secure: true,
    });

    res.send(newUser);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body; //get from body
  if (!email || !password) {
    res.status(401);
    throw new Error("Please provide valid credentials");
  }

  //s/ findingUser
  const existingUser = await User.findOne({
    email,
  }).select("+password");

  if (!existingUser) {
    res.status(401);
    throw new error("User not found");
  }
  const validPassword = await bcrypt.compare(password, existingUser.password);
  if (!validPassword) {
    res.status(401);
    throw new error("Password not found");
  }

  existingUser.onlineStatus = true;
  //M/TOKENS
  //S/ generate new tokens
  const { accessToken: accessTokenNew, refreshToken: refreshTokenNew } = await generateTokens({ _id: existingUser._id });

  //s/ update token in DB
  await updateRefreshToken(existingUser._id, refreshTokenNew);

  //s/ store new tokens in cookies
  res.cookie("refreshToken", refreshTokenNew, {
    maxAge: 1000 * 60 * 60 * 24 * 30,
    httpOnly: true,
    // secure: true,
  });
  res.cookie("accessToken", accessTokenNew, {
    maxAge: 1000 * 60 * 60 * 24 * 30,
    httpOnly: true,
    // secure: true,
  });

  const { coverPicture, email: userEmail, friends, profilePicture, userName, _id, onlineStatus } = existingUser;
  res.send({ coverPicture, userEmail, friends, friends, profilePicture, userName, _id, onlineStatus });
});

export const greetMe = asyncHandler(async (req, res) => {
  res.send("hi there");
});

export const refresh = async (req, res) => {
  // get refresh token from cookie
  const { refreshToken: refreshTokenFromCookies } = req.cookies;

  // check if refreshtoken is valid
  let userData;
  try {
    userData = await validateRefreshToken(refreshTokenFromCookies);
  } catch (err) {
    console.log(err);
    return res.status(401).json({ message: "Invalid Token" });
  }

  // check if refreshtoken is in DB
  try {
    const token = await findRefreshToken(userData._id, refreshTokenFromCookies);
    if (!token) {
      res.status(401).json({ message: "Invalid Token" });
    }
  } catch (err) {
    return res.status(500).json({ message: "Internal error" });
  }

  // check if user(receive from rToken) is valid
  console.log(userData._id);
  const user = await User.findOne({ _id: userData._id });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // Generate new tokens(access and refresh)
  const { refreshToken, accessToken } = await generateTokens({ _id: userData._id });

  // update refreshToken
  try {
    await updateRefreshToken(userData._id, refreshToken);
  } catch (err) {
    return res.status(500).json({ message: "Internal error" });
  }

  // put in cookie
  res.cookie("refreshtoken", refreshToken, {
    maxAge: 1000 * 60 * 60 * 24 * 30, //30days
    httpOnly: true,
  });
  res.cookie("accesstoken", accessToken, {
    maxAge: 1000 * 60 * 60 * 24 * 30, //30days
    httpOnly: true,
  });

  // response
  res.json({ user, isAuth: true });
};

const offlineStatus = asyncHandler(async (req, res) => {});
