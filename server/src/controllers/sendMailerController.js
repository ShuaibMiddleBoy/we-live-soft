require('dotenv').config();
const nodemailer = require("nodemailer");

const sendMailer = async (req, res) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_USER, // Use environment variable for Gmail email address
                pass: process.env.GMAIL_APP_PASSWORD // Use environment variable for Gmail app password
            }
        });

        const mailOptions = {
            from: process.env.GMAIL_USER, // Use environment variable
            to: 'shuaib.middle@example.com',
            subject: 'Hello ✔',
            text: 'Hello world?',
            html: '<b>Hello world?</b>',
        };

        const info = await transporter.sendMail(mailOptions);

        console.log("Message sent: %s", info.messageId);
        res.json(info);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error sending email: " + error.message);
    }
};

module.exports = { sendMailer };
