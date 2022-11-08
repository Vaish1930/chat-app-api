import mongoose from "mongoose";

const chatRoomSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    profileUrl: { type: String },
    adminUserId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("ChatRoom", chatRoomSchema);
