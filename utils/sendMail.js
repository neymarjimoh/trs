const nodemailer = require("nodemailer");
const config = require("../config");
const from = "\"TRS\" <trs.com>";

const EMAIL_ADDRESS = config.APP_EMAIL;
const EMAIL_PASSWORD = config.EMAIL_PASS;

function setup() {
  return nodemailer.createTransport({
    // host: "smtp.gmail.com",
    // port: 587,
    // secure: false,
    service: 'Gmail',
    port: 465,
    // service: "Gmail",
    auth: {
      user: EMAIL_ADDRESS,
      pass: EMAIL_PASSWORD,
    },
  });
}

exports.sendConfirmEmail = (data) => {
  const transport = setup();
  const userEmail = data.email;
  const generateConfirmationUrl = `http://localhost:4000/api/v1/auth/verify/${userEmail}`;

  const msg = {
    from: EMAIL_ADDRESS,
    to: userEmail,
    subject: "Activate your account",
    text: `
    Welcome to the TRS app. We are very happy to have you here. Activate your account.
    `,
    html: `
      <h2 style="display: flex; align-items: center;">Welcome to TRS</h2>
        <p>Please activate your account using <a href=${generateConfirmationUrl}>this link</a>
         🎊 🎉 🚀</p>
    `,
  };
  transport.sendMail(msg);
};
