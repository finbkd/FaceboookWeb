import mongoose from "mongoose";
const notificationSchema = mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["Accepted friend Request", "Received friend Request", "Rejected friend request", "liked", "commented"],
      required: true,
    },
    receiver: {
      type: String,
      required: true,
    },
    sender: {
      type: String,
      ref: "User",
      required: true,
    },
    senderProfilePic: {
      type: String,
      required: true,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Notification = mongoose.model("Notification", notificationSchema);

export default Notification;
