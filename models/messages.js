import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const Schema = mongoose.Schema;

const messagesSchema = new mongoose.Schema({
  displayName: {
    type: String,
    required: true,
  },
  senderID: {
    type: String,
    required: true,
  },
  recipientID: {
    type: String,
    required: true,
  },
  sendMessage: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Messages = mongoose.model("messages", messagesSchema);
