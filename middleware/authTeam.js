import jwt from "jsonwebtoken";
import { TeamMember } from "../models/teamMember.js";

export const isAuthenticatedTeam = async (req, res, next) => {
    try {
        const { token } = req.cookies;

        if (!token) {
            return res.status(401).json({ success: false, message: `Otp has send to your email ${email}. Please Check your email` });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.teamMember = await TeamMember.findById(decoded._id);

        next();
    } catch (error) {
        res.status(500).json({ success: false, message: `sadfsdfsdfsdf, ${error.message}` });
    }
};