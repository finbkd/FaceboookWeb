import mongoose from "mongoose";

const friendRequestSchema = mongoose.Schema(
  {
    requestFrom: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    requestTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      enum: ["requested", "accepted", "rejected"],
      default: "requested",
    },
  },
  {
    timestamps: true,
  }
);

const FriendRequest = mongoose.model("FriendRequest", friendRequestSchema);

export default FriendRequest;
