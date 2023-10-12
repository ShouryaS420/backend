import { PostVideo } from "../models/postVideo.js";
import { sendToken2 } from "../utils/sendToken2.js";

export const postVideo = async (req, res) => {
  try {
    const { userID, location, videoURI, userName, userPro, videoDuration, caption, videoType } = req.body;
    // const multipleImageURI = req.map(file => file.buffer.toString('base64'));

    let post = await PostVideo.findOne({ location });

    // if (!post) {
      post = await PostVideo.create({
        userID,
        location,
        caption,
        videoURI, // Store the array of image base64 strings
        userName, // Store the array of image base64 strings
        userPro, // Store the array of image base64 strings
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

export const getPostAllVideo = async (req, res) => {
  try {
    // Query the database to retrieve videos of the specified type
    const videos = await PostVideo.find();

    res.json(videos);
  } catch (error) {
    console.error('Error fetching videos:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export const getPostAllVideoByVideoType = async (req, res) => {
  try {
    const { videoType } = req.params;

    // Query the database to retrieve videos of the specified type
    const videos = await PostVideo.find({ videoType });

    res.json(videos);
  } catch (error) {
    console.error('Error fetching videos:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export const addLikeToReels = async (req, res) => {
  try {
    const { id, likeById } = req.params;

    // Find the reel by ID
    const reel = await PostVideo.findById(id);

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
    const currentUser = await PostVideo.findById(id);

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
  // try {
  //   const id = req.params.id;
  //   const userIdToRemove = req.params.userId;

  //   // Find the video by ID
  //   const video = await PostVideo.findById(id);

  //   if (!video) {
  //     return res.status(404).json({ error: 'Video not found' });
  //   }

  //   // Remove the user's ID from the likesBy array
  //   video.likesBy.pull(userIdToRemove);
    
  //   // Save the updated video
  //   await video.save();

  //   return res.status(200).json(video);
  // } catch (error) {
  //   res.status(500).json({ error: 'Error removing like', details: error.message });
  // }
  try {
    const { id, userIdToRemove } = req.params;

    // Find the video by ID
    const video = await PostVideo.findById(id);

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

export const getPostAllVideoByVideoTypeAndTheirID = async (req, res) => {
  try {
    const videoType = req.params.videoType;

    // Use Mongoose to find reels that match the videoType
    const reels = await PostVideo.find({ videoType });

    if (!reels || reels.length === 0) {
      return res.status(404).json({ error: 'No reels found with the specified videoType' });
    }

    // Extract the main IDs from the fetched reels
    const reelIds = reels.map(reel => reel.likes);

    res.status(200).json({ reels: reelIds });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching reels by videoType', details: error.message });
  }

}