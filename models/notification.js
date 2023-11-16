import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const Schema = mongoose.Schema;

const notificationSchema = new mongoose.Schema({
  videoID: {
    type: String,
    required: true,
  },
  commentByUserID: {
    type: String,
    required: true,
  },
  commentByUserProPhoto: {
    type: String,
    required: true,
  },
  commentToWhoID: {
    type: String,
    required: true,
  },
  commentToWhoName: {
    type: String,
    required: true,
  },
  postURI: {
    type: String,
    required: true,
  },
  postType: {
    type: String,
    required: true,
  },
  messageType: {
    type: String,
    required: true,
  },
  verified: {
    type: String,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Notification = mongoose.model("notification", notificationSchema);
