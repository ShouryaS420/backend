export const sendToken2 = (res, group, statusCode, message) => {

    const token = group.getJWTToken();

    const options = {
        httpOnly: true,
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
    };

    const userData = {
        _id: group._id,
        userID: group.userID,
        groupName: group.groupName,
        groupPrivacySetting: group.groupPrivacySetting,
    };

    res
        .status(statusCode)
        .cookie("token", token, options)
        .json({ success: true, message, group: userData });

};
