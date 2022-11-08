import express from "express";
import cors from "cors";
import connectDb from "./db.js";
import userRouter from "./routes/user.js";
import chatRoomRouter from "./routes/chatRoom.js";
import messageRouter from "./routes/message.js";
import dotenv from "dotenv";

dotenv.config({ path: "./config/config.env" });

const PORT = process.env.PORT || 100;

const app = express();

app.use(express.json()); // req,res change into json
app.use(cors()); // security

await connectDb();

app.get("/", (req, res) => res.json("Welcome to chat-api"));
app.use("/api", userRouter);
app.use("/api", chatRoomRouter);
app.use("/api", messageRouter);

app.listen(PORT, () => console.log(`Listening on localhost : ${PORT}`));
