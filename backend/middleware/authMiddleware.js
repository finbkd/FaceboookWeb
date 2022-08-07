import asyncHandler from "express-async-handler";
import { validateAcccessToken } from "../services/token-service.js";

export const protect = asyncHandler(async (req, res, next) => {
  const { accessToken } = req.cookies;
  if (!accessToken) {
    throw new error("No access Token provided");
  }

  const userData = await validateAcccessToken(accessToken);
  // if there's something wrong with token, it will send error here automaitcally. If you want custom error, use try catch.
  req.user = userData;
  next();
});
