const menuSchema = require('../models/menuSchema');

// Logo and menu 
const menu = async (req, res) => {
    try {
        const menuData = req.body;

        // Find the existing menu document based on its ObjectId
        const existingMenu = await menuSchema.findOne({});

        // If it exists, update the fields
        if (existingMenu) {
            if (req.file) {
                existingMenu.logoImage = req.file.filename;
            }
            else if (!existingMenu.logoImage && !req.file) {
                existingMenu.logoImage = undefined;
            }
            // existingMenu.logoImage = logoImage;
            existingMenu.menuItems = menuData.menuItems.title.map((title, index) => ({
                title: title,
                link: menuData.menuItems.url[index],
            }));

            // save the updated document 
            await existingMenu.save();
            res.status(200).json('Menu uploaded successfully.');
        } else {
            // If it doesn't exist, create a new menu instance
            const newMenu = new menuSchema({
                logoImage: req.file ? req.file.filename : (existingMenu.logoImage || undefined),
                menuItems: menuData.menuItems.title.map((title, index) => ({
                    title: title,
                    link: menuData.menuItems.url[index],
                })),
            });

            // save the updated document 
            await newMenu.save();
            res.status(200).json('Menu uploaded successfully.');
        }
    } catch (error) {
        console.error(error);
        res.status(500).json('Internal Server Error');
    }
};



// get menu data from db 
const getMenu = async (req, res) => {
    try {
        const menuData = await menuSchema.findOne(); // Retrieve menu data

        if (menuData) {
            res.status(200).json(menuData);
        } else {
            res.status(404).json({ message: 'No menu data found.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


module.exports = { menu, getMenu };