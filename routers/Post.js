import express from "express";
import {
  postImg,
  getPostImg,
  getPostImgByIDandGetLikes,
  getPostImgByPostType1,
  getPostImgByPostType2,
  getPostImgByPostType3,
  getPostAllImg,
  addLikeToReels,
  removeLikeFromVideo,
  following,
} from "../controllers/Post.js";
import multer from "multer";

const router = express.Router();

// Set up multer middleware with memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Add multer middleware to the postImg route handler
router.route("/postImg").post(upload.array("images", 5), postImg);
router.route("/getPostImg/:userID").get(getPostImg);
router.route("/getPostImgByIDandGetLikes/:id").post(getPostImgByIDandGetLikes);
router.route("/getPostImgByPostType1/:userID/:videoURI").get(getPostImgByPostType1);
router.route("/getPostImgByPostType2/:userID/:imageURI").get(getPostImgByPostType2);
router.route("/getPostImgByPostType3/:postType").get(getPostImgByPostType3);
router.route("/getPostAllImg").get(getPostAllImg);
router.route("/addLikeToReels/:id/:likeById").post(addLikeToReels);
router.route("/following/:id/:likeById").post(following);
router.route("/removeLikeFromVideo/:id/:userIdToRemove").delete(removeLikeFromVideo);

export default router;
