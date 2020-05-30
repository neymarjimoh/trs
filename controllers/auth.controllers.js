const statusCode = require("http-status");
const bcrypt = require('bcryptjs');
const sendMail = require("../utils/sendMail");
const { Passenger } = require("../models");

exports.userSignUp = async (req, res) => {
    const { email, password, mobile_num, fullname, address } = req.body;
    const userExists = await Passenger.findOne({ email });
    if (userExists) {
        return res.status(statusCode.CONFLICT).json({
            message: "User already exists"
        });
    }
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new Passenger({
            email, 
            fullname,
            password: hashedPassword,
            address,
            mobile_num           
        });
        const savedUser = await user.save();
        sendMail.sendConfirmEmail(savedUser); // sends activation link
        return res.status(statusCode.OK).json({
            message: "Account created. Please check your email, you will receive a confirmation mail in few minutes."
        });
    } catch (error) {
        console.error(error);
        return res.status(statusCode.INTERNAL_SERVER_ERROR).json({
            message: "Something went wrong. Try again."
        });
    }
};

exports.activateUserAccount = async (req, res) => {
    const { email } = req.params;
    try {
        const userFound = await Passenger.findOneAndUpdate({ email }, { is_verified: true });
        if (!userFound) {
            return res.status(statusCode.NOT_FOUND).json({
                message: `Account ${email} doesn't exist`
            });
        }   
        return res.status(statusCode.OK).json({
            message: "Account verification successful. You can login"
        });
    } catch (error) {
        console.error(error);
        return res.status(statusCode.SERVICE_UNAVAILABLE).json({
            message: 'Something went wrong. Please try again..'
        });
    }
};

exports.userSignIn = (req, res) => {

};

exports.userLogOut = (req, res) => {

}