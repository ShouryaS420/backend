export const sendTokenTeam = (res, teamMember, statusCode, message) => {

    const tokenTeam = teamMember.getJWTToken();

    const options = {
        httpOnly: true,
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
    };

    const teamData = {
        _id: teamMember._id,
        name: teamMember.name,
        email: teamMember.email,
        mobile: teamMember.mobile,
        role: teamMember.role,
    };

    res
        .status(statusCode)
        .cookie("tokenTeam", tokenTeam, options)
        .json({ success: true, message, teamMember: teamData });

};
