const contactSchema = require('../models/contactSchema');
const nodemailer = require("nodemailer");
require('dotenv').config();

// Separate sendMailer function
const sendMailer = async (formData) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_APP_PASSWORD
        }
    });
    const mailOptions = {
        from: process.env.GMAIL_USER,  // This needs to be your Gmail address
        to: process.env.GMAIL_USER,
        subject: `New Contact from ${formData.name}`,
        text: `Message from ${formData.email}: ${formData.message}`,
        html: `<b>Message from ${formData.email}:</b> <p>${formData.message}</p>`,
    };

    return transporter.sendMail(mailOptions); // Return the promise for handling in contactForm
};

// contact form
const contactForm = async (req, res) => {
    try {
        const formData = req.body;
        const contact = await new contactSchema(formData).save();

        try {
            const info = await sendMailer(formData);
            console.log("Message sent: %s", info.messageId);
            // Combine both responses into one
            res.status(201).json({ success: true, message: 'Form submitted and email sent successfully', data: contact, emailInfo: info });
        } catch (error) {
            // Log the email error but do not fail the entire request
            console.error("Error sending email: ", error.message);
            res.status(201).json({ success: true, message: 'Form submitted successfully but email not sent', data: contact });
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Internal Server Error', error });
    }
};

module.exports = { contactForm };
