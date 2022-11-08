import { Router } from "express";
import Message from "../models/Message.js";
import { verifyToken } from "../utils.js";

const router = Router();

router.post(
  "/chatRoom/:chatRoomId/messages/create",
  verifyToken,
  async (req, res) => {
    try {
      const { _id: userId } = req.user;
      const { text, image } = req.body;
      if (!text && !image) return res.status(400).json(`Not a valid message`);
      const message = new Message({
        ...req.body,
        userId,
        chatRoomId: req.params.chatRoomId,
      });
      const createdMessage = await message.save();
      res.status(201).json(createdMessage);
    } catch (error) {
      res.status(500).json(`Something went wrong , error : ${error}`);
    }
  }
);

router.get("/chatRoom/:chatRoomId/messages", verifyToken, async (req, res) => {
  try {
    const messages = await Message.find({
      chatRoomId: req.params.chatRoomId,
    }).populate("userId", "-password -userType -phoneNumber -email -__v");
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json(`Something went wrong , error : ${error}`);
  }
});

export default router;
