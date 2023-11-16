import express from "express";
import {
  pushNotification,
  getPushNotification,
  getPushNotificationCount,
  getPushNotificationVerified,
} from "../controllers/Notification.js";

const router = express.Router();

router.route("/pushNotification").post(pushNotification);
router.route("/getPushNotification/:commentToWhoID").post(getPushNotification);
router.route("/getPushNotificationCount/:commentToWhoID").get(getPushNotificationCount);
router.route("/getPushNotificationVerified/:commentToWhoID").post(getPushNotificationVerified);

export default router;
