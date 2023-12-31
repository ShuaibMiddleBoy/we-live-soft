const mongoose = require('mongoose');

const servicesSchema = new mongoose.Schema({
    services:[
        {
            serviceImage: {
                type: String,
            },
            serviceTitle: {
                type: String,
                required: true
            },
            serviceDesc: {
                type: String,
                required: true
            },
        },
    ],
    clients:[
        {
            clientImage: {
                type: String,
            }
        },
    ],
    feedbacks:[
        {
            image: {
                type: String,
            },
            reviewer: {
                type: String,
                required: true
            },
            company: {
                type: String,
                required: true
            },
            description: {
                type: String,
                required: true
            },
        },
    ],
    plans:[
        {
            name: {
                type: String,
                required: true
            },
            price: {
                type: String,
                required: true
            },
            description: {
                type: String,
                required: true
            },
        },
    ],
})

module.exports = mongoose.model("Services", servicesSchema);
