import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const Schema = mongoose.Schema;

const commentSchema = new mongoose.Schema({
  videoID: {
    type: String,
    required: true,
  },
  userID: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    default: '',
  },
  userPro: {
    type: String,
    default: '',
  },
  userName: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Comment = mongoose.model("comment", commentSchema);
