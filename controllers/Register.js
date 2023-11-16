import { Register } from "../models/register.js";
import { ForgetPassword } from "../models/forgetPassword.js";
import { sendToken } from "../utils/sendToken.js";
import { sendToken2 } from "../utils/sendToken2.js";
import bcrypt from "bcrypt";

export const createUser = async (req, res) => {
  try {
    const {
      fullName,
      userName,
      email,
      password,
      mobileNumber,
      coverImage,
      profileImage,
    } = req.body;

    let register = await Register.findOne({ mobileNumber });

    const otp = Math.floor(Math.random() * 1000000);

    if (register) {
      return res
        .status(400)
        .json({ success: false, message: `This mobile 😠 "${mobileNumber}" 😠 already exists` });
    }

    register = await Register.create({
      fullName,
      userName,
      email,
      password,
      mobileNumber,
      coverImage,
      profileImage,
      otp,
      otp_expiry: new Date(Date.now() + process.env.OTP_EXPIRE * 60 * 1000),
    });

    sendToken(
      res,
      register,
      201,
      `OTP has sent you Mobile Number ${mobileNumber}`
    );
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const checkUserExistByUserName = async (req, res) => {
  try {
    const { userName } = req.body;

    let register = await Register.findOne({ userName });

    if (register) {
      return res
        .status(400)
        .json({ success: false, message: `This User Name 😠 "${userName}" 😠 already exists` });
    }

    res.status(200).json({ success: true, message: `This User Name "${userName}" not exist` });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const verify = async (req, res) => {
  try {
    const otp = Number(req.body.otp);

    const register = await Register.findById(req.register._id);

    if (register.otp !== otp || register.otp_expiry < Date.now()) {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }

    register.verified = true;
    // register.otp = null;
    register.otp_expiry = null;

    await register.save();

    sendToken(res, register, 201, "You Have Created a New User 😍✌️");
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const sendOTPToPhUNLogin = async (req, res) => {
  try {
    const { searchQuery } = req.body;

    const user = await Register.findOne({
      $or: [
        { mobileNumber: searchQuery },
        { email: searchQuery },
        { userName: searchQuery },
      ],
    });

    if (user) {
      // User found, return fullName
      const userDetails = user;
      res.json({ success: true, message: userDetails });
    } else {
      // User not found, return error
      res.status(404).json({ success: false, message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const checkOTP = async (req, res) => {
  try {
    const { otp } = req.body;

    const user = await Register.findOne({
      $or: [{ otp: otp }],
    });

    if (user) {
      // User found, return fullName
      const userDetails = user;
      res.json({ success: true, message: userDetails });
    } else {
      // User not found, return error
      res.status(404).json({ success: false, message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const register = await Register.find();
    res.json(register);
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
};

export const logout = async (req, res) => {
  try {
    res
      .status(200)
      .cookie("token", null, {
        expires: new Date(Date.now()),
      })
      .json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const forgotFindAccount = async (req, res) => {
  try {
    const { searchQuery } = req.body;

    const user = await Register.findOne({
      $or: [
        { mobileNumber: searchQuery },
        // { email: searchQuery },
        { userName: searchQuery },
      ],
    });

    if (user) {
      // User found, return fullName
      const userDetails = user;
      res.json({ success: true, message: userDetails });
    } else {
      // User not found, return error
      res.status(404).json({ success: false, message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const forgotPassSendOTP = async (req, res) => {
  try {
    const { mobileNumber } = req.body;

    let forgetPass = await ForgetPassword.findOne({ mobileNumber });

    const otp = Math.floor(Math.random() * 1000000);

    // if (forgetPass) {
    //   return res
    //     .status(400)
    //     .json({ success: false, message: `This User Name 😠 "${userName}" 😠 already exists` });
    // }

    forgetPass = await ForgetPassword.create({
      mobileNumber,
      otp,
      otp_expiry: new Date(Date.now() + process.env.OTP_EXPIRE * 60 * 1000),
    });

    sendToken2(
      res,
      forgetPass,
      201,
      `OTP has sent you Mobile Number ${mobileNumber}`
    );
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const forgotPassSendOTPVerify = async (req, res) => {
  try {
    const { otp } = req.body;

    const user = await ForgetPassword.findOne({ otp });

    user.verified = true;

    if (user) {
      // User found, return fullName
      const otp = user.otp;
      res.json({ success: true, message: "Otp Verified Successfully", user });
    } else {
      // User not found, return error
      res.status(404).json({ success: false, message: "Invalid Otp" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updatePassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { password } = req.body;

    // Hash the new password before saving it to the database
    const hashedPassword = await password;

    // Update the user's password
    const updatedUser = await Register.findByIdAndUpdate(
      id,
      { password: hashedPassword },
      { new: true }
    );

    res
      .status(200)
      .json({ success: true, message: "Password updated successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const { fullName, userName, coverImage, profileImage } = req.body;

    // Hash the new password before saving it to the database
    // Update the user's password
    const updatedUser = await Register.findByIdAndUpdate(
      id,
      {
        fullName: fullName,
        userName: userName,
        coverImage: coverImage,
        profileImage: profileImage,
      },
      { new: true }
    );

    res
      .status(200)
      .json({ success: true, message: "Password updated successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getUserDetailsByID = async (req, res) => {
  try {
    const { id } = req.params;
    const register = await Register.findById(id);

    res.json(register);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching post" });
  }
};

export const followUser = async (req, res) => {
  try {
    const { currentUserID, followingUserID } = req.params;
    const currentUser = await Register.findById(currentUserID);
    const userToUnfollow = await Register.findById(followingUserID);

    if (currentUser.following.includes(currentUserID)) {
      return res
        .status(400)
        .json({ message: "You are already following this user" });
    }

    userToUnfollow.followers.push(currentUserID);
    await userToUnfollow.save();

    const userToFollow = await Register.findById(currentUserID);
    userToFollow.following.push(followingUserID);
    await userToFollow.save();

    res.json({ message: "Followed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const unFollowUser = async (req, res) => {
  try {
    const { currentUserID, followingUserID } = req.params;

    // Find the current user and the user to unfollow
    const currentUser = await Register.findById(currentUserID);
    const userToUnfollow = await Register.findById(followingUserID);

    if (!currentUser || !userToUnfollow) {
      return res.status(404).json({ message: 'User not found' });
    }

    console.log('Before Unfollow:');
    console.log('currentUser.following:', currentUser.following);
    console.log('userToUnfollow.followers:', userToUnfollow.followers);

    // Remove the user to unfollow from the current user's following list
    currentUser.following = currentUser.following.filter(_id => _id.toString() !== followingUserID);

    // Explicitly update the userToUnfollow document
    userToUnfollow.followers = userToUnfollow.followers.filter(_id => _id.toString() !== currentUserID);
    await userToUnfollow.save(); // Save the updated userToUnfollow document

    console.log('After Unfollow:');
    console.log('currentUser.following:', currentUser.following);
    console.log('userToUnfollow.followers:', userToUnfollow.followers);

    // Save the current user document
    await currentUser.save();

    res.json({ message: 'Unfollowed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const following = async (req, res) => {
  try {
    const { currentUserId, followingUserId } = req.params;
    // Find the current user by their ID
    const currentUser = await Register.findById(currentUserId);

    if (!currentUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the following user ID is present in the current user's following list
    const isFollowing = currentUser.following.includes(followingUserId);

    res.json({ message: isFollowing });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getTotalFollowingCount = async (req, res) => {
  try {
    // Find the current user by their ID
    const { currentUserId } = req.params;
    const currentUser = await Register.findById(currentUserId);

    if (!currentUser) {
      return res.status(404).json({ message: "0" });
    }

    // Get the total count of following users
    const totalFollowingCount = currentUser.following.length;

    res.json({ message: totalFollowingCount });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }

}

export const getTotalFollowerCount = async (req, res) => {
  try {
    // Find the current user by their ID
    const { currentUserId } = req.params;
    const currentUser = await Register.findById(currentUserId);

    if (!currentUser) {
      return res.status(404).json({ message: "0" });
    }

    // Get the total count of following users
    const totalfollowersCount = currentUser.followers.length;

    res.json({ message: totalfollowersCount });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }

}