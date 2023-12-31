import jwt from "jsonwebtoken";
import { Register } from "../models/register.js";

export const isAuthenticated = async (req, res, next) => {
    try {
        const { token } = req.cookies;

        if (!token) {
            return res.status(401).json({ success: false, message: `Otp has send to your email ${email}. Please Check your email` });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.register = await Register.findById(decoded._id);

        next();
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};