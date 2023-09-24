import { Group } from "../models/group.js";
import { sendToken2 } from "../utils/sendToken2.js";

export const createGroup = async (req, res) => {
  try {
    const { userID, groupName, groupPrivacySetting, profilePhoto, coverPhoto, description } = req.body;

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

    res.status(500).json({ success: false, message: group });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateGroup = async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;

    const updatedProject = await Group.findByIdAndUpdate(
      id,
      { description: description },
      { new: true }
    );
  
    if (!updatedProject) {
      return res.status(404).json({ message: 'Project not found' });
    }
  
    res.json(updatedProject);

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