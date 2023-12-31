const mongoose = require('mongoose');



const homeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String
    },

    socialLinks: [
        {
            title: String,
            link: String
        }
    ],
    skills: [String],
    aboutMe: String,
    resumeLink: String,
    address: [
        {
            title: String,
            value : String
        }
    ]

})
module.exports = mongoose.model('home', homeSchema);