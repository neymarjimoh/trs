const statusCode = require('http-status');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sendMail = require('../utils/sendMail');
const { User } = require('../models');
const config = require('../config');
const transporter = require ('../utils/transporter');

exports.userSignUp = async (req, res) => {
	const { email, password, mobile_num, fullname, address } = req.body;
	const userExists = await User.findOne({ email });
	if (userExists) {
		return res.status(statusCode.CONFLICT).json({
			message: 'User already exists',
		});
	}
	try {
		const hashedPassword = await bcrypt.hash(password, 10);
		const user = new User({
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
		console.log("Error from user sign up >>>>> ", error);
		return res.status(statusCode.INTERNAL_SERVER_ERROR).json({
			message: 'Something went wrong. Try again.',
		});
	}
};

exports.activateUserAccount = async (req, res) => {
	const { email } = req.params;
	try {
		const userFound = await User.findOneAndUpdate(
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
		console.log("Error from user acount activation >>>>> ", error);
		return res.status(statusCode.SERVICE_UNAVAILABLE).json({
			message: 'Something went wrong. Please try again..',
		});
	}
};

exports.userSignIn = async (req, res) => {
	const { email, password } = req.body;

	const validUser = await User.findOne({ email });

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

		const accessToken = jwt.sign(
			{                 
                userId: validUser._id, 
                email: validUser.email 
            },
			config.SECRET_KEY,
			{ 
                expiresIn: '1d' 
            }
		);

		return res.status(statusCode.OK).json({
			message: 'User signed in successfully',
			passsenger: validUser,
			accessToken: accessToken
		});
	} catch (error) {
		console.log("Error from user sign in >>>>> " ,error);
		return res.status(statusCode.SERVICE_UNAVAILABLE).json({
			message: 'Something went wrong. Please try again..'
		});
	}
};

exports.forgetPassword = async (req, res) => {
	try {
		const { email } = req.body;
		const user = await User.findOne({ email });
		if (!user || !user.is_verified) {
			return res.status(statusCode.NOT_FOUND).json({
				message: `This email is not registered or has not been activated`,
			});
		}
		const url = `http://localhost:4000/api/v1/auth/reset-password/${user.id}`;
		const msg = {
			from: EMAIL_ADDRESS,
			to: email,
			subject: 'FORGOT PASSWORD',
			html: `
				<h1 style="color: royalblue;font-family: Verdana;font-size: 300%;">TRS.inc</h1>
				Hello ${user.fullname}, 
				<br>
				<br>
				There was a request to reset your password
				<br>
				<br>
				Please click on the button below to get a new password
				<br>
				<br>
				<a href='${url}'><button>Reset Password</button></a>
				<br>
				<br>
				If you did not make this request, just ignore this email as nothing has changed.
				<br>
				<br>
				Best Regards,
				<br>
				The TRS Team!
			`,
		};
		transporter.sendMail(msg); // send password link
		return res.status(statusCode.OK).json({
			status: 'success',
            message: `A password reset link has been sent to ${email}`
		});
	} catch (error) {
		console.log("Error from user password forget >>>>> " ,error);
		return res.status(statusCode.SERVICE_UNAVAILABLE).json({
			message: 'Something went wrong. Please try again..'
		});
	}
};

exports.resetPassword = async (req, res) => {
	try {
		const { userId } = req.params;
		const { password } = req.body;
		const hashedPw = await bcrypt.hash(password, 10);
		const user = await User.findByIdAndUpdate({ _id: userId }, { $set: { password: hashedPw } });
		if (!user) {
            return res.status(statusCode.NOT_FOUND).json({
                message: 'User does not exist.'
            });
		}
		return res.status(statusCode.OK).json({
			message: 'Password has been updated successfully. You can login',
		});	
	} catch (error) {
		console.log("Error from user password reset >>>>> " ,error);
		return res.status(statusCode.SERVICE_UNAVAILABLE).json({
			message: 'Something went wrong. Please try again..'
		});
	}
};

exports.userLogOut = (req, res) => {
	//res.json({ message: 'done' });
};
