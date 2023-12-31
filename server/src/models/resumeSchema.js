const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
    education: [
        {
            title: {
                type: String,
                required: true
            },
            date: {
                type: String,
                required: true
            },
            institute: {
                type: String,
                required: true
            },
            description: {
                type: String,
                required: true
            },
        },
    ],
    experience: [
        {
            position: {
                type: String,
                required: true
            },
            timeline: {
                type: String,
                required: true
            },
            company: {
                type: String,
                required: true
            },
            description: {
                type: String,
                // required: true
            },
        },
    ],

    coding: [
        {
            name: {
                type: String,
                required: true
            },
            percentage: {
                type: String,
                required: true
            },
        },
    ],

    resume: {
        type: String,
        // required: true
    },
});

module.exports = mongoose.model("Resume", resumeSchema);
