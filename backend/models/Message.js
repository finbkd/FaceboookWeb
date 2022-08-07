import mongoose from "mongoose";
const messageSchema = mongoose.Schema(
  {
    sender: {
      required: true,
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    content: {
      required: true,
      type: String,
      required: true,
    },
    chatId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chat",
    },
  },
  {
    timestamps: true,
  }
);

const Message = mongoose.model("Message", messageSchema);

export default Message;
