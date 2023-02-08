import { User } from "../models/users.js";
import { sendMail } from "../utils/sendMail.js";
import { sendToken } from "../utils/sendToken.js";

export const register = async (req, res) => {
    try {
        
        const { name, email, city, mobile } = req.body;

        let user = await User.findOne({ email });

        if(user){
            return res
            .status(400)
            .json({ success: false, message: "User already exists" });
        }

        const otp = Math.floor(Math.random() * 1000000);

        const password = "shourya";

        user = await User.create({
            name,
            email,
            city,
            mobile,
            password,
            otp,
            otp_expiry:new Date(Date.now() + process.env.OTP_EXPIRE * 60 * 1000),
        });

        await sendMail(email, "Verify your account", `Your OTP is ${otp}`);

        sendToken(
            res,
            user,
            201,
            "OTP sent to your email, please verify your account"
        );

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const verify = async (req, res) => {
    try {
        const otp = Number(req.body.otp);

        const user = await User.findById(req.user._id);

        if (user.otp !== otp || user.otp_expiry < Date.now()) {
            res.status(400).json({ success: false, message: "Invalid OTP or has been Expired" });
        }

        const passwordGEN = (Math.random() + 1).toString(36).substring(7);

        user.verified = true;
        user.otp = null;
        user.otp_expiry = null;

        user.password = passwordGEN;
        const email = user.email;

        await user.save();

        await sendMail(email, "Your ID & Password", `Your ID is ${email} & Your Password is ${passwordGEN}`);

        sendToken(res, user, 200, "Account Verified");

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const login = async (req, res) => {
    try {
        
        const { email, password } = req.body;

        if(!email || !password) {
            return res
            .status(400)
            .json({ success: false, message: "Please enter all fields" });
        }

        const user = await User.findOne({ email }).select("+password");

        if(!user){
            return res
            .status(400)
            .json({ success: false, message: "Invalid Email or Password" });
        }

        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            return res
            .status(400)
            .json({ success: false, message: "Invalid Email or Password" });
        }

        sendToken(
            res,
            user,
            200,
            "Login Successful"
        );

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const logout = async (req, res) => {
    try {
        res
            .status(200)
            .cookie("token",null, {
                expires: new Date(Date.now()),
            })
            .json({ success: true, message: "Logged out successfully" });
            
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const addTask = async (req, res) => {
    try {

        const {title, description} = req.body;

        const user = await User.findById(req.user._id);

        user.tasks.push({
            title,
            description,
            completed:false,
            createdAt:new Date(Date.now()),
        });

        await user.save();

        res.status(200).json({ success: true, message: "Task added successfully" });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const removeTask = async (req, res) => {
    try {

        const { taskId } = req.params;

        const user = await User.findById(req.user._id);

        user.tasks = user.tasks.filter((task) => task._id.toString() !== taskId.toString());

        await user.save();

        res.status(200).json({ success: true, message: "Task removed successfully" });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const updateTask = async (req, res) => {
    try {

        const { taskId } = req.params;

        const user = await User.findById(req.user._id);

        user.task = user.tasks.find((task) => task._id.toString() === taskId.toString());

        user.task.completed = !user.task.completed; 

        await user.save();

        res.status(200).json({ success: true, message: "Task updated successfully" });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getMyProfile = async (req, res) => {
    try {

        const user =  await User.findById(req.user._id);

        sendToken(res, user, 201, `Welcome back ${user.name}`);
            
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const updateProfile = async (req, res) => {
    try {
        const user =  await User.findById(req.user._id);

        const { name, city, mobile } = req.body;

        if (name || city || mobile) {
            user.name = name;
            user.city = city;
            user.mobile = mobile;
        }

        await user.save();

        res
            .status(200)
            .json({ success: true, message: "Profile Updated Successfully" });
            
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const updatePassword = async (req, res) => {
    try {
        const user =  await User.findById(req.user._id).select("+password");

        const { oldPassword, newPassword } = req.body;

        if (!oldPassword || !newPassword) {
            res
            .status(400)
            .json({ success: false, message: "Please enter all fields" });
        }

        const isMatch = await user.comparePassword(oldPassword);

        if (!isMatch) {
            res
            .status(400)
            .json({ success: false, message: "Invalid Old Password" });
        }

        user.password = newPassword;

        await user.save();

        res
            .status(200)
            .json({ success: true, message: "Password Updated Successfully" });
            
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const forgetPassword = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid Email" });
        }

        const otp = Math.floor(Math.random() * 9999) + 1000;

        user.resetPasswordOtp = otp;
        user.resetPasswordOtpExpiry = Date.now() + 10 * 60 * 1000;

        await user.save();

        const message = `<h1>Your OTP for resetting the password</h1> <b>${otp}</b>. <p>if you did not request for this, please ignore this email</p>.`;

        await sendMail(email, "Request for Resetting Password", message);

        res.status(200).json({ success: true, message: `OTP sent to your this email ${email}` });
            
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const resetPassword = async (req, res) => {
    try {
        const { otp, newPassword } = req.body;

        const user = await User.findOne({
            resetPasswordOtp: otp,
            resetPasswordOtpExpiry: { $gt: Date.now() },
        }).select("+password");

        if (!user) {
            return res.status(400).json({ success: false, message: "OTP Invalid or has been Expired" });
        }

        user.password = newPassword;
        user.resetPasswordOtp = null;
        user.resetPasswordOtpExpiry = null;
        await user.save();

        res.status(200).json({ success: true, message: "Password Changed Successfully" });
            
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
