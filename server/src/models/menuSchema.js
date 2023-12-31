const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
    logoImage: {
        type: String,
    },

    menuItems: [
        {
            title: {
                type: String,
                required: true
            }, 
            link: {
                type: String,
                required: true
            },
        },
    ],
});

module.exports = mongoose.model("Menu", menuSchema);
