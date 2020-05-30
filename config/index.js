require('dotenv').config();
module.exports = {
	PORT: process.env.PORT || 4000,
	MONGODBURI: process.env.MONGOURI || 'mongodb://127.0.0.1:27017/trs',
	EMAIL_PASS: process.env.EMAIL_PASS,
	APP_EMAIL: process.env.APP_EMAIL,
};
