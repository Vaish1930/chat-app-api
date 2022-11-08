import mongoose from "mongoose";

const mongooseOptions = {
  type: String,
  required: true,
};

const userSchema = new mongoose.Schema(
  {
    name: mongooseOptions,
    password: mongooseOptions,
    email: mongooseOptions,
    phoneNumber: { ...mongooseOptions, required: false },
    userType: { ...mongooseOptions, default: "user" },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);
