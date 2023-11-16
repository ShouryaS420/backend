import express from "express";
import {
  projectDetails,
} from "../controllers/ProjectDetails.js";

const router = express.Router();

router.route("/projectDetails").post(projectDetails);

export default router;
