import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const Schema = mongoose.Schema;

const registerSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  mobileNumber: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
    default: '123456',
  },
  coverImage: {
    type: String,
    default: 'cover-image',
  },
  profileImage: {
    type: String,
    default: 'profile-image',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  otp: Number,
  loginOtp: Number,
  otp_expiry: Date,
});

registerSchema.methods.getJWTToken = function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000,
  });
};

registerSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

registerSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

registerSchema.index({ otp_expiry: 1 }, { expireAfterSeconds: 0 });


export const Register = mongoose.model("register", registerSchema);
