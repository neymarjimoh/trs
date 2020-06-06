const statusCode = require("http-status");
const bcrypt = require('bcryptjs');
const sendMail = require("../utils/sendMail");
const { User } = require("../models");

exports.userSignUp = async (req, res) => {
    const { email, password, phoneNumber } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
        return res.status(statusCode.CONFLICT).json({
            message: "User already exists"
        });
    }
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            email,
            password: hashedPassword,
            phoneNumber
        });
        const savedUser = await user.save();
        sendMail.sendConfirmEmail(savedUser); // sends activation link
        return res.status(statusCode.OK).json({
            messages: "Account created. Please check your email, you will receive a confirmation mail in few minutes."
        });
    } catch (error) {
        console.log("Error from user sign up >>>>> ",error);
        return res.status(statusCode.INTERNAL_SERVER_ERROR).json({
            message: "Something went wrong. Try again."
        });
    }
};

exports.activateUserAccount = async (req, res) => {
    const { email } = req.params;
    try {
        const userFound = await User.findOneAndUpdate({ email }, { isverified: true });
        if (!userFound) {
            return res.status(statusCode.NOT_FOUND).json({
                message: `Account ${email} doesn't exist`
            });
        }   
        return res.status(statusCode.OK).json({
            message: "Account verification successful. You can login"
        });
    } catch (error) {
        console.log("Error from user account activation >>>>> ",error);
        return res.status(statusCode.SERVICE_UNAVAILABLE).json({
            message: 'Something went wrong. Please try again..'
        });
    }
};

exports.userSignIn = (req, res) => {

};

exports.userLogOut = (req, res) => {

}