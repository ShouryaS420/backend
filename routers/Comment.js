import express from "express";
import {
  commentOnVideo,
  getCommentVideoByVideoID,
  deleteComment,
  countCommentsByVideoID,
  projectDetails
} from "../controllers/Comment.js";

const router = express.Router();

router.route("/projectDetails").post(projectDetails);
router.route("/commentOnVideo").post(commentOnVideo);
router.route("/getCommentVideoByVideoID/:videoID").get(getCommentVideoByVideoID);
router.route("/deleteComment/:id").get(deleteComment);
router.route("/countCommentsByVideoID/:videoID").get(countCommentsByVideoID);

export default router;
