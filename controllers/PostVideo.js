import { PostVideo } from "../models/postVideo.js";
import { sendToken2 } from "../utils/sendToken2.js";

export const postVideo = async (req, res) => {
  try {
    const { userID, location, videoURI, videoDuration, caption, videoType } = req.body;
    // const multipleImageURI = req.map(file => file.buffer.toString('base64'));

    let post = await PostVideo.findOne({ location });

    // if (!post) {
      post = await PostVideo.create({
        userID,
        location,
        caption,
        videoURI, // Store the array of image base64 strings
        videoDuration,
        videoType,
      });

      res.status(200).json({ success: true, message: post });
    // } else {
    //   res.status(400).json({ success: false, message: "Post with the same location already exists." });
    // }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getPostVideo = async (req, res) => {
  try {
    const { userID } = req.params;
    const message = await PostVideo.find({ userID })
    
    res.json(message);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching post' });
  }
}

export const getAllPostVideo = async (req, res) => {
  try {
    const message = await PostVideo.find()
    res.json(message);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching post' });
  }
}