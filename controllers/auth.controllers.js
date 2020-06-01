const statusCode = require('http-status');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sendMail = require('../utils/sendMail');
const { Passenger } = require('../models');
const config = require('../config/index');

exports.userSignUp = async (req, res) => {
	const { email, password, mobile_num, fullname, address } = req.body;
	const userExists = await Passenger.findOne({ email });
	if (userExists) {
		return res.status(statusCode.CONFLICT).json({
			message: 'User already exists',
		});
	}
	try {
		const hashedPassword = await bcrypt.hash(password, 10);
		const user = new Passenger({
			email,
			fullname,
			password: hashedPassword,
			address,
			mobile_num,
		});
		const savedUser = await user.save();
		sendMail.sendConfirmEmail(savedUser); // sends activation link
		return res.status(statusCode.OK).json({
			message:
				'Account created. Please check your email, you will receive a confirmation mail in few minutes.',
		});
	} catch (error) {
		console.error(error);
		return res.status(statusCode.INTERNAL_SERVER_ERROR).json({
			message: 'Something went wrong. Try again.',
		});
	}
};

exports.activateUserAccount = async (req, res) => {
	const { email } = req.params;
	try {
		const userFound = await Passenger.findOneAndUpdate(
			{ email },
			{ is_verified: true }
		);
		if (!userFound) {
			return res.status(statusCode.NOT_FOUND).json({
				message: `Account ${email} doesn't exist`,
			});
		}
		return res.status(statusCode.OK).json({
			message: 'Account verification successful. You can login',
		});
	} catch (error) {
		console.error(error);
		return res.status(statusCode.SERVICE_UNAVAILABLE).json({
			message: 'Something went wrong. Please try again..',
		});
	}
};

exports.userSignIn = async (req, res) => {
	const { email, password } = req.body;

	const validUser = await Passenger.findOne({ email });

	if (!validUser) {
		return res.status(statusCode.NOT_FOUND).json({
			message: `Account ${email} doesn't exist`,
		});
	}

	try {
		if (!validUser.is_verified) {
			return res.status(statusCode.UNAUTHORIZED).json({
				message: 'Please, verify your email first',
			});
		}

		const confirmedPassword = await bcrypt.compare(
			password,
			validUser.password
		);
		if (!confirmedPassword) {
			return res.status(statusCode.FORBIDDEN).json({
				message: 'Invalid password',
			});
		}

		const accessToken = await jwt.sign(
			{ userId: validUser._id, email: validUser.email },
			config.SECRET_KEY,
			{ expiresIn: '1d' }
		);

		return res.status(statusCode.OK).json({
			message: 'Passenger signed in successfully',
			passsenger: validUser,
			accessToken: accessToken,
		});
	} catch (error) {
		console.error(error);
		return res.status(statusCode.SERVICE_UNAVAILABLE).json({
			message: 'Something went wrong. Please try again..',
		});
	}
};

exports.userLogOut = (req, res) => {
	//res.json({ message: 'done' });
};
