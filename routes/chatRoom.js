import { Router } from "express";
import ChatRoom from "../models/ChatRoom.js";
import { verifyToken } from "../utils.js";

const router = Router();

router.post("/chatRooms/create", verifyToken, async (req, res) => {
  try {
    const { _id: adminUserId } = req.user;

    // if (userType !== "admin" && adminUserId !== req.user_id)
    //   return res.status(401).json(`Not authorized to craete a chatroom`);
    const chatRoom = new ChatRoom({ ...req.body, adminUserId });
    const createdChatroom = await chatRoom.save();
    res.status(201).json(createdChatroom);
  } catch (error) {
    res.status(500).json(`Something went wrong , error : ${error}`);
  }
});

router.get("/chatRooms", verifyToken, async (req, res) => {
  try {
    const chatRooms = await ChatRoom.find();
    res.status(200).json(chatRooms);
  } catch (error) {
    res.status(500).json(`Something went wrong , error : ${error}`);
  }
});

router.patch("/chatRooms/update/:id", verifyToken, async (req, res) => {
  try {
    const { _id: adminUserId, userType } = req.user;
    const chatRoom = await ChatRoom.findById(req.params.id);
    // console.log(typeof chatRoom.adminUserId);
    if (userType !== "admin" && chatRoom.adminUserId.toString() !== adminUserId)
      return res.status(401).json("Not authorized");
    const updatedChatRoom = await ChatRoom.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    res.status(200).json(updatedChatRoom);
  } catch (error) {
    res.status(500).json(`Something went wrong , error : ${error}`);
  }
});
router.delete("/chatRooms/delete/:id", verifyToken, async (req, res) => {
  try {
    const { _id: adminUserId, userType } = req.user;
    const chatRoom = await ChatRoom.findById(req.params.id);
    // console.log(typeof chatRoom.adminUserId);
    if (userType !== "admin" && chatRoom.adminUserId.toString() !== adminUserId)
      return res.status(401).json("Not authorized");
    const deletedChatRoom = await ChatRoom.findOneAndDelete({
      _id: req.params.id,
    });
    res.status(200).json(deletedChatRoom);
  } catch (error) {
    res.status(500).json(`Something went wrong , error : ${error}`);
  }
});

export default router;
