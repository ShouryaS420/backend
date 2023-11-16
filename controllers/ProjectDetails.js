import { ProjectDetails } from "../models/projectDetails.js";

export const projectDetails = async (req, res) => {
  try {
    const { city } = req.body;

    let projectDetail = await ProjectDetails.find({ city });

    projectDetail = await ProjectDetails.create({
      city,
    });

    res.status(500).json({ success: true, message: projectDetail });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};