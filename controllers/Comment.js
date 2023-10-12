import { Comment } from "../models/comment.js";
import bcrypt from "bcrypt";

export const commentOnVideo = async (req, res) => {
  try {
    const {
      videoID,
      userID,
      comment,
      userPro,
      userName,
    } = req.body;

    let comments = await Comment.find();

    comments = await Comment.create({
      videoID,
      userID,
      comment,
      userPro,
      userName,
    });

    res.status(200).json({ success: true, message: comments });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getCommentVideoByVideoID = async (req, res) => {
  try {
    const { videoID } = req.params;

    // Query the database to retrieve videos of the specified type
    const comments = await Comment.find({ videoID });

    res.json(comments);

  } catch (error) {
    console.error('Error fetching videos:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export const deleteComment = async (req, res) => {
  try {
    const commentId = req.params.id;

    // Find the comment by its _id and remove it
    const deletedComment = await Comment.findByIdAndRemove(commentId);

    if (!deletedComment) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    res.status(200).json(deletedComment);

  } catch (error) {
    res.status(500).json({ error: 'Error deleting comment', details: error.message });
  }
};

export const countCommentsByVideoID = async (req, res) => {
  try {
    const { videoID } = req.params;

    // Count comments that belong to the specified video
    const commentCount = await Comment.countDocuments({ videoID: videoID });
    
    res.status(200).json({ commentCount });

  } catch (error) {
    res.status(500).json({ error: 'Error counting comments', details: error.message });
  }
};