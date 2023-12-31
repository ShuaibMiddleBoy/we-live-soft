const mongoose = require("mongoose");


const contactInfoSchema = new mongoose.Schema({
    // Schema for contact page
    map: {
        type: String,
        required: true,
    },
    contactData: [
        {
            icon: {
                type: String,
                required: true,
            },
            info: {
                type: String,
                required: true,
            }
        },
    ],
});

module.exports = mongoose.model("ContactInfo", contactInfoSchema);