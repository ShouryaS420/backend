import { Post } from "../models/post.js";
import { sendToken2 } from "../utils/sendToken2.js";

export const postImg = async (req, res) => {
  try {
    const { userID, location, imageURI, userName, userPro, multipleImageURI, caption, imageType } = req.body;
    // const multipleImageURI = req.map(file => file.buffer.toString('base64'));
    
    let post = await Post.findOne({ location });
    
    // if (!post) {
      post = await Post.create({
        userID,
        location,
        caption,
        imageURI,
        userName,
        userPro,
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

export const getPostAllImg = async (req, res) => {
  try {
    const { userID } = req.params;
    const post = await Post.find();

    if (!post) {
      return res.status(404).json({ message: "0" });
    }

    res.json({ message: post });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching post' });
  }
}

export const addLikeToReels = async (req, res) => {
  try {
    const { id, likeById } = req.params;

    // Find the reel by ID
    const reel = await Post.findById(id);

    if (!reel) {
      return res.status(404).json({ error: 'Reel not found' });
    }

    reel.likesBy.push(likeById);
    await reel.save();

    // Increment the likes count
    reel.likes += 1;

    // Save the updated reel
    await reel.save();

    res.status(200).json(reel);
  } catch (error) {
    res.status(500).json({ error: 'Error adding like', details: error.message });
  }
}

export const following = async (req, res) => {
  try {
    const { id, likeById  } = req.params;
    // Find the current user by their ID
    const currentUser = await Post.findById(id);

    if (!currentUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the following user ID is present in the current user's following list
    const isFollowing = currentUser.likesBy.includes(likeById);

    res.json({ message: isFollowing });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const removeLikeFromVideo = async (req, res) => {
  try {
    const { id, userIdToRemove } = req.params;

    // Find the video by ID
    const video = await Post.findById(id);

    if (!video) {
      return res.status(404).json({ error: 'Video not found' });
    }

    // Find the index of the user's ID in the likesBy array
    const userIndexToRemove = video.likesBy.indexOf(userIdToRemove);

    if (userIndexToRemove !== -1) {
      // Remove the user's ID from the likesBy array
      video.likesBy.splice(userIndexToRemove, 1);
      
      video.likes -= 1;
      // Save the updated video
      await video.save();
      
      return res.status(200).json(video);
    } else {
      return res.status(400).json({ error: 'User has not liked this video' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error removing like', details: error.message });
  }
};