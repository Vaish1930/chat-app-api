import mongoose from "mongoose";

const mongooseOptions = {
  type: String,
};

const messageSchema = new mongoose.Schema(
  {
    text: mongooseOptions,
    image: mongooseOptions,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    chatRoomId: { type: mongoose.Schema.Types.ObjectId, ref: "ChatRoom" },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Message", messageSchema);
