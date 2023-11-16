import { Group } from "../models/group.js";
import { sendToken2 } from "../utils/sendToken2.js";

export const createGroup = async (req, res) => {
  try {
    const { userID, groupName, groupPrivacySetting } = req.body;

    let group = await Group.findOne({ groupName });

    if (group) {
      return res
        .status(400)
        .json({ success: false, message: `This Group Name 😠 "${groupName}" 😠 already exists` });
    }

    group = await Group.create({
      userID,
      groupName,
      groupPrivacySetting,
      profilePhoto,
      coverPhoto,
      description
    });

    res.status(200).json({ success: false, message: group.message });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateGroup = async (req, res) => {
  try {
    const { id } = req.params;
    const { description, profilePhoto, coverPhoto } = req.body;
  
    const updatedGroup = await Group.findByIdAndUpdate(id, {
      description: description,
      profilePhoto: profilePhoto,
      coverPhoto: coverPhoto,
    }, { new: true });
  
    if (!updatedGroup) {
      return res.status(404).json({ message: 'Group not found' });
    }
  
    res.json(updatedGroup);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

export const getGroup = async (req, res) => {
  const { userID } = req.params;
  try {
    const group = await Group.find({ userID });
    res.json(group);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching group by userID' });
  }
};

export const getGroupByID = async (req, res) => {
  const { id } = req.params;
  try {
    const group = await Group.findById(id);
    res.json(group);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching group by userID' });
  }
};