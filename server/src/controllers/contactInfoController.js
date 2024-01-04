const contactInfoSchema = require('../models/contactInfoSchema')
const path = require('path');


// Route for handling form data
const contactInfo = async (req, res) => {
    try {
        const { map, contact } = req.body;
        // Find the existing menu document based on its ObjectId
        const existingContactInfo = await contactInfoSchema.findOne();
        if (existingContactInfo) {
            existingContactInfo.map = map;
            existingContactInfo.contactData = contact.icon.map((icon, index) => ({
                icon: icon,
                info: contact.info[index],
            }));

            // Save the updated document
            await existingContactInfo.save();
            res.status(200).json('Contact info uploaded successfully.');
        } else {
            // If it doesn't exist, create a new contact info instance
            const contactInfo = new contactInfoSchema({
                map,
                contactData: contact.icon.map((icon, index) => ({
                    icon: icon,
                    info: contact.info[index],
                })),
            });

            // save the updated document 
            await contactInfo.save();
            res.status(200).json('Menu uploaded successfully.');
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};



// get contactInfo data from db 
const getContactInfo = async (req, res) => {
    try {
        const contactInfoData = await contactInfoSchema.findOne(); // Retrieve contactInfo data

        if (contactInfoData) {
            res.status(200).json(contactInfoData);
        } else {
            res.status(404).json({ message: 'No contactInfo data found.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { contactInfo, getContactInfo };
