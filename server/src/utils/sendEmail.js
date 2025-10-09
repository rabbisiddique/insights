const nodemailer = require("nodemailer");

const sendEmail = async ({ to, subject, html }) => {
  if (!to || to.trim() === "") {
    throw new Error("No recipients defined");
  }
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"InsightHub" <rabbybhai276@gmail.com>`,
      to,
      subject,
      html,
    };

    const info = await transporter.sendMail(mailOptions);
    return { message: "Email sent", info };
  } catch (err) {
    console.error("Error sending email:", err.message || err);
    throw err;
  }
};

module.exports = sendEmail;
