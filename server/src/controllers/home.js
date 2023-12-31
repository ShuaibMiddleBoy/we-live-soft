const HomeSchema = require('../models/homeSchema');

const createHome = async (req, res) => {
  try {
    const homeName = req.body.name;
    const homeData = {
      name: homeName,
      image: req.file ? req.file.filename : undefined, 
      socialLinks: req.body.socialLinks,
      skills: req.body.skills,
      aboutMe: req.body.aboutMe,
      resumeLink: req.body.resumeLink,
      address: req.body.address
    };

    if (!req.file) {
      delete homeData.image;
    }
    const existingHome = await HomeSchema.findOne({ name: homeName });

    if (existingHome) {
      // Update existing home
      const updatedHome = await HomeSchema.findOneAndUpdate(
        { name: homeName },
        homeData,
        { new: true } // Return the updated document
      );
      res.status(200).json(updatedHome);
    } else {
      // Create new home
      const home = new HomeSchema(homeData);
      const savedHome = await home.save();
      res.status(201).json(savedHome);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};



const getHome = async (req, res) => {
  try {
    // You can modify the query as needed, for example, to fetch a specific home by name
    const homes = await HomeSchema.find({}); // This will find all homes in the database

    // If no homes are found, you can choose to send a different status code or message
    if (!homes || homes.length === 0) {
      return res.status(404).json({ message: 'No homes found' });
    }

    // If homes are found, send them back in the response
    res.status(200).json(homes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = { createHome, getHome };