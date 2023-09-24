import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const Schema = mongoose.Schema;

const forgetPasswordSchema = new mongoose.Schema({
  mobileNumber: {
    type: String,
    required: true,
  },
  otp: Number,
  otp_expiry: Date,
  verified: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

forgetPasswordSchema.methods.getJWTToken = function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000,
  });
};

forgetPasswordSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

forgetPasswordSchema.index({ otp_expiry: 1 }, { expireAfterSeconds: 0 });

export const ForgetPassword = mongoose.model("forgetPasswordUser", forgetPasswordSchema);
