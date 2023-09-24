import express from "express";
import {
  createUser,
  verify,
  sendOTPToPhUNLogin,
  checkOTP,
  getUser,
  logout,
  forgotFindAccount,
  forgotPassSendOTP,
  forgotPassSendOTPVerify,
  updatePassword,
  updateProfile,
  getUserDetailsByID,
} from "../controllers/Register.js";
import { isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

router.route("/createUser").post(createUser);
router.route("/verify").post(isAuthenticated, verify);
router.route("/sendOTPToPhUNLogin").post(sendOTPToPhUNLogin);
router.route("/checkOTP").post(checkOTP);
router.route("/getUser").get(getUser);
router.route("/logout").get(logout);
router.route("/forgotFindAccount").post(forgotFindAccount);
router.route("/forgotPassSendOTP").post(forgotPassSendOTP);
router.route("/forgotPassSendOTPVerify").post(isAuthenticated, forgotPassSendOTPVerify);
router.route("/updatePassword/:id").put(updatePassword);
router.route("/updateProfile/:id").put(updateProfile);
router.route("/getUserDetailsByID/:id").get(getUserDetailsByID);

export default router;
