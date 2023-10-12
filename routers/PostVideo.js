import express from "express";
import {
  postVideo,
  getPostVideo,
  getAllPostVideo,
  getPostAllVideo,
  getPostAllVideoByVideoType,
  addLikeToReels,
  removeLikeFromVideo,
  following,
  getPostAllVideoByVideoTypeAndTheirID,
} from "../controllers/PostVideo.js";
import multer from "multer";

const router = express.Router();

// Add multer middleware to the postVideo route handler
router.route("/postVideo").post(postVideo);
router.route("/getPostVideo/:userID").get(getPostVideo);
router.route("/getAllPostVideo").get(getAllPostVideo);
router.route("/getPostAllVideo").get(getPostAllVideo);
router.route("/getPostAllVideoByVideoType/:videoType").get(getPostAllVideoByVideoType);
router.route("/addLikeToReels/:id/:likeById").post(addLikeToReels);
router.route("/following/:id/:likeById").post(following);
router.route("/removeLikeFromVideo/:id/:userIdToRemove").delete(removeLikeFromVideo);
router.route("/getPostAllVideoByVideoTypeAndTheirID/:videoType").get(getPostAllVideoByVideoTypeAndTheirID);

export default router;
