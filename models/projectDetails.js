import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const Schema = mongoose.Schema;

const projectDetailsSchema = new mongoose.Schema({
  city: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const ProjectDetails = mongoose.model("project-details", projectDetailsSchema);
