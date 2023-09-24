import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const Schema = mongoose.Schema;

const imageSchema = new mongoose.Schema({
  access_mode: String,
  asset_id: String,
  bytes: String,
  created_at: String,
  etag: String,
  folder: String,
  format: String,
  height: String,
  original_filename: String,
  placeholder: String,
  public_id: String,
  resource_type: String,
  secure_url: String,
  signature: String,
  tags: String,
  type: String,
  url: String,
  version: String,
  version_id: String,
  width: String,
});

const postSchema = new mongoose.Schema({
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
  imageURI: {
    type: String,
    required: true,
  },
  multipleImageURI: [String],
  imageType: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Post = mongoose.model("post-image", postSchema);
