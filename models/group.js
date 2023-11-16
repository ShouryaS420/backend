import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const Schema = mongoose.Schema;

const groupSchema = new mongoose.Schema({
  userID: {
    type: String,
  },
  groupName: {
    type: String,
  },
  groupPrivacySetting: {
    type: String,
  },
  profilePhoto: {
    type: String,
    // required: true,
    default: "",
  },
  coverPhoto: {
    type: String,
    // required: true,
    default: "",
  },
  description: {
    type: String,
    // required: true,
    default: "",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  members:Number,
});

// groupSchema.methods.getJWTToken = function () {
//   return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
//     expiresIn: process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000,
//   });
// };

export const Group = mongoose.model("group", groupSchema);
