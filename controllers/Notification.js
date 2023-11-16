import { Notification } from "../models/notification.js";
import bcrypt from "bcrypt";

export const pushNotification = async (req, res) => {
  try {
    const { videoID, commentByUserID, commentByUserProPhoto, commentToWhoID, commentToWhoName, postURI, postType, messageType, } = req.body;

    let notification = await Notification.find();

    notification = await Notification.create({
      videoID,
      commentByUserID,
      commentByUserProPhoto,
      commentToWhoID,
      postURI,
      postType,
      messageType,
    });

    res.status(200).json({ success: true, message: "Successfully Push Nottification", result: notification });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getPushNotification = async (req, res) => {
  try {

    const { commentToWhoID } = req.params;
    
    const notification = await Notification.find({ commentToWhoID });

    res.status(200).json({ success: true, message: "Successfully", result: notification });

  } catch (error) {
    console.error('Error fetching videos:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export const getPushNotificationVerified = async (req, res) => {
  try {

    const { commentToWhoID } = req.params;
    
    const notification = await Notification.find({ commentToWhoID });

    notification.map( async (item, index) => {
      item.verified = true;
      await item.save();
      res.status(200).json({ success: true, message: "Successfully", result: notification });
    })


  } catch (error) {
    console.error('Error fetching videos:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export const getPushNotificationCount = async (req, res) => {
  try {

    const { commentToWhoID } = req.params;
    
    const notification = await Notification.find({ commentToWhoID });
    // console.log();

    notification.map( async (item, index) => {
      if (item.verified === "true") {
        res.status(200).json({ success: true, message: "status", result: 'true' });
      } else {
        const notificationCount = await Notification.countDocuments({ commentToWhoID: commentToWhoID });  
        res.status(200).json({ success: true, message: "count", result: notificationCount });
      }
    })



  } catch (error) {
    console.error('Error fetching videos:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}