import { Messages } from "../models/messages.js";
import { Register } from "../models/register.js";
import bcrypt from "bcrypt";

export const sendMessages = async (req, res) => {
  try {
    const { displayName, senderID, recipientID, sendMessage } = req.body;

    const newMessage = Messages({
      displayName,
      senderID,
      recipientID,
      sendMessage
    });

    await newMessage.save();
    res.status(200).json({ message: "Message sent Successfully" });

    // res.status(200).json({ success: true, message: message });

  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
}

export const getMessagesBySenderID = async (req, res) => {
  try {
    const { senderID, recipientID } = req.params;
    const message = await Messages.find({
      $or:[
        {senderID: senderID, recipientID: recipientID},
        {senderID: recipientID, recipientID: senderID}
      ]
    }).populate("senderID", "_id fullName");
    
    res.json(message);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching group by recipientID' });
  }
};

export const getUserByUserID = async (req, res) => {
  try {
    const user = await Register.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteMessages = async (req, res) => {
  try {

    const {sendMessage} = req.body;

    if(!Array.isArray(sendMessage) || sendMessage.length === 0) {
      return res.status(400).json({message: "Invalid req body!"});
    }

    await Messages.deleteMany({ _id: { $in: sendMessage } });

    res.json({message:"Message deleted successfully"})

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server error' });
  }
};