const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema({
    projects: [
        {
            title: {
                type: String,
                required: true
            },
            image: {
                type: String,
            },
            details: {
                type: String,
                required: true
            },
            category: {
                type: String,
                required: true
            },
            previewLink: {
                type: String,
                required: true
            },
        }
    ]
})

module.exports = mongoose.model('Portfolio', portfolioSchema);