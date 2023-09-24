import { Post } from "../models/post.js";
import { sendToken2 } from "../utils/sendToken2.js";

export const postImg = async (req, res) => {
  try {
    const { userID, location, imageURI, multipleImageURI, caption, imageType } = req.body;
    // const multipleImageURI = req.map(file => file.buffer.toString('base64'));
    
    let post = await Post.findOne({ location });
    
    // if (!post) {
      post = await Post.create({
        userID,
        location,
        caption,
        imageURI,
        multipleImageURI, // Store the array of image base64 strings
        imageType,
      });
      
      res.status(200).json({ success: true, message: post });
      // } else {
        //   res.status(400).json({ success: false, message: "Post with the same location already exists." });
        // }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getPostImg = async (req, res) => {
  try {
    const { userID } = req.params;
    const message = await Post.find({ userID })
    
    res.json(message);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching post' });
  }
}