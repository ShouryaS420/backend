export const sendToken = (res, register, statusCode, message) => {

    const token = register.getJWTToken();

    const options = {
        httpOnly: true,
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
    };

    const userData = {
        _id: register._id,
        fullName: register.fullName,
        userName: register.userName,
        email: register.email,
        password: register.password,
        mobileNumber: register.mobileNumber,
        otp: register.otp,
        verified: register.verified,
    };

    res
        .status(statusCode)
        .cookie("token", token, options)
        .json({ success: true, message, register: userData });

};
