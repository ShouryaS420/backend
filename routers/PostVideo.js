import express from "express";
import {
  postVideo,
  getPostVideo,
  getAllPostVideo,
} from "../controllers/PostVideo.js";
import multer from "multer";

const router = express.Router();

// Add multer middleware to the postVideo route handler
router.route("/postVideo").post(postVideo);
router.route("/getPostVideo/:userID").get(getPostVideo);
router.route("/getAllPostVideo").get(getAllPostVideo);

export default router;
