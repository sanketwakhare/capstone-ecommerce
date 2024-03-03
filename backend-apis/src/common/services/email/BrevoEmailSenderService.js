// Brevo email service
const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");

const sendEmail = async (emailData) => {
  const { BREVO_USER, BREVO_PASSWORD } = process.env;

  const techDetails = {
    host: "smtp-relay.brevo.com",
    port: 587,
    secure: false,
    auth: {
      user: BREVO_USER,
      pass: BREVO_PASSWORD,
    },
  };

  const transporter = nodemailer.createTransport(techDetails);
  const defaultEmailData = {
    to: "sanketwakhare@gmail.com",
    from: "sanketwakhare@gmail.com",
    subject: "Sending Email with nodemailer",
    html: "<strong>Nodemailer is sending email now</strong>",
  };

  const emailDataObject = { ...defaultEmailData, ...emailData };

  return transporter.sendMail(emailDataObject);
};

const sendOtpViaEmail = async (emailData) => {
  const { BREVO_USER, BREVO_PASSWORD } = process.env;

  const templatePath = path.join(
    __dirname,
    "templates",
    "forgot_password_otp_template.html"
  );

  const templateContents = fs.readFileSync(templatePath, "utf8");
  const otpHtmlTemplate = templateContents.replace("#{otp}", emailData.otp);

  const techDetails = {
    host: "smtp-relay.brevo.com",
    port: 587,
    secure: false,
    auth: {
      user: BREVO_USER,
      pass: BREVO_PASSWORD,
    },
  };

  const transporter = nodemailer.createTransport(techDetails);
  const emailDataObject = {
    to: emailData.to,
    from: "sanketwakhare@gmail.com",
    subject: "Verify your login",
    html: otpHtmlTemplate,
  };

  return transporter.sendMail(emailDataObject);
};

module.exports = {
  sendEmail,
  sendOtpViaEmail,
};
