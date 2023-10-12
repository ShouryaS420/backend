import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const Schema = mongoose.Schema;

const postVideoSchema = new mongoose.Schema({
  userID: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    default: '',
  },
  caption: {
    type: String,
    default: '',
  },
  videoURI: {
    type: String,
    required: true,
  },
  videoDuration: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  userPro: {
    type: String,
    required: true,
  },
  videoType: {
    type: String,
    required: true,
  },
  likesBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  likes: {
    type: Number, 
    default: '0',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const PostVideo = mongoose.model("post-video", postVideoSchema);
