import express from "express";
import {
  sendMessages,
  getMessagesBySenderID,
  getUserByUserID,
  deleteMessages,
} from "../controllers/Messages.js";

const router = express.Router();

router.route("/sendMessages").post(sendMessages);
router.route("/getMessagesBySenderID/:senderID/:recipientID").get(getMessagesBySenderID);
router.route("/getUserByUserID/:id").get(getUserByUserID);
router.route("/deleteMessages").post(deleteMessages);
// router.route("/getMessagesByUserID/:uID").get(getMessagesByUserID);

export default router;
