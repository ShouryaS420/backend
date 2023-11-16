import express from "express";
import {
  createGroup,
  getGroup,
  updateGroup,
  getGroupByID,
} from "../controllers/Group.js";

const router = express.Router();

router.route("/createGroup").post(createGroup);
router.route("/updateGroup/:id").put(updateGroup);
router.route("/getGroup/:userID").get(getGroup);
router.route("/getGroupByID/:id").get(getGroupByID);

export default router;
