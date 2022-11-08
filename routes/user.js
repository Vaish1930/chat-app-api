import { Router } from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { generateToken, verifyToken } from "../utils.js";

const router = Router(); // instance

router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;
    const doesUserExist = await User.findOne({ email });
    if (doesUserExist)
      return res.status(400).json(`User with this ${email} already exists`);

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = new User({ ...req.body, password: hashedPassword });
    const createdUser = await user.save();
    const token = generateToken(createdUser);

    res.status(201).header("authToken", token).json({
      _id: createdUser._id,
      name: createdUser.name,
      email: createdUser.email,
      userType: createdUser.userType,
      token,
    });
  } catch (error) {
    res.status(500).json(`Something went wrong , error : ${error}`);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    // email validatioon
    const doesUserExist = await User.findOne({ email });
    if (!doesUserExist) return res.status(400).json(`Invalid email`);

    //password validation
    const isPasswordValid = await bcrypt.comapre(
      password,
      doesUserExist.password
    );

    if (!isPasswordValid) return res.status(400).json(`Invalid password`);

    const token = generateToken(doesUserExist);

    res.status(201).header("authToken", token).json({
      _id: doesUserExist._id,
      name: doesUserExist.name,
      email: doesUserExist.email,
      userType: doesUserExist.userType,
      token,
    });
  } catch (error) {
    res.status(500).json(`Something went wrong , error : ${error}`);
  }
});

router.get("/user/auto-login", verifyToken, async (req, res) => {
  try {
    const user = { ...req.user, token: req.header("authToken") };
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(`Something went wrong , error : ${error}`);
  }
});

router.patch("/user/update", verifyToken, async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    const userData = {};
    if (name) userData = { ...userData, name };
    if (email) userData = { ...userData, email };
    if (phone) userData = { ...userData, phone };

    const user = await User.findByIdAndUpdate({ _id: req.user._id }, userData, {
      new: true,
    });

    const token = req.header("authToken");
    res.status(200).header("authToken", token).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      userType: user.userType,
      token,
    });
  } catch (error) {
    res.status(500).json(`Something went wrong ${error}`);
  }
});

export default router;
