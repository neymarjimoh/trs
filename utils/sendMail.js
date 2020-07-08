const nodemailer = require('nodemailer');
const config = require('../config');
const from = '"TRS" <trs.com>';
const jwt = require('jsonwebtoken');
const { EMAIL_SECRET } = require('../config/index');

const EMAIL_ADDRESS = config.APP_EMAIL;
const EMAIL_PASSWORD = config.EMAIL_PASS;

function setup() {
	return nodemailer.createTransport({
		service: 'Gmail',
		port: 465,
		auth: {
			user: EMAIL_ADDRESS,
			pass: EMAIL_PASSWORD,
		},
	});
}

exports.sendConfirmEmail = async (data) => {
	const transport = setup();
	const userEmail = data.email;
	const userName = data.fullname;
	const accessToken = await jwt.sign({ userId: data._id }, EMAIL_SECRET, {
		expiresIn: '1d',
	});
	const generateConfirmationUrl = `http://localhost:4000/api/v1/auth/verify?email=${userEmail}&s=${accessToken}`;

	const msg = {
		from: EMAIL_ADDRESS,
		to: userEmail,
		subject: 'Activate your account',
		text: `
    Welcome to the TRS app. We are very happy to have you here. Activate your account.
    `,
		html: `
      <h2 style="display: flex; align-items: center;">Welcome to TRS</h2>
        <p>Hello ${userName},</p>
        <p>Please activate your account using <a href=${generateConfirmationUrl}>this link</a>
         🎊 🎉 🚀</p>
    `,
	};
	let info = await transport.sendMail(msg);
	console.log(`mail sent successfully >>> ${info.messageId}`);
	return;
};
