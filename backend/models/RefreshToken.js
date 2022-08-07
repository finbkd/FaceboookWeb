import mongoose from "mongoose";

const refreshTokenSchema = mongoose.Schema(
  {
    token: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const RefreshToken = mongoose.model("refreshToken", refreshTokenSchema);

export default RefreshToken;
