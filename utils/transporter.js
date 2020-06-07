const nodemailer = require('nodemailer');
const config = require("../config");
const EMAIL_ADDRESS = config.APP_EMAIL;
const EMAIL_PASSWORD = config.EMAIL_PASS;

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  port: 465,
  auth: {
    user: EMAIL_ADDRESS,
    pass: EMAIL_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

module.exports = transporter;