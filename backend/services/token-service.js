import jwt from "jsonwebtoken";
import RefreshToken from "../models/RefreshToken.js";

export const generateTokens = async (data) => {
  const accessToken = jwt.sign(data, process.env.JWT_ACCESS_TOKEN_SECRET, {
    expiresIn: "30d",
  });
  const refreshToken = jwt.sign(data, process.env.JWT_REFRESH_TOKEN_SECRET, {
    expiresIn: "1y",
  });

  return { accessToken, refreshToken };
};

export const validateAcccessToken = async (token) => {
  const decodedToken = jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET);
  //if it expires, then jwt automatically gives us expired error
  return decodedToken;
};
export const validateRefreshToken = async (token) => {
  const decodedToken = jwt.verify(token, process.env.JWT_REFRESH_TOKEN_SECRET);
  //if it expires, then jwt automatically gives us expired error
  return decodedToken;
};

export const storeRefreshTokenDB = async (userId, refreshToken) => {
  if (refreshToken) {
    const token = await RefreshToken.create({ token: refreshToken, userId });
  }
};

export const findRefreshToken = async (userId, refreshToken) => {
  return await RefreshToken.findOne({ token: refreshToken }, { userId });
};

export const updateRefreshToken = async (userId, refreshToken) => {
  return await RefreshToken.updateOne({ userId: userId }, { token: refreshToken });
};
