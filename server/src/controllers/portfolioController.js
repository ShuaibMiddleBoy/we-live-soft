const portfolioSchema = require('../models/portfolioSchema')

// Route for handling form data
const portfolio = async (req, res) => {

    try {
        const { project } = req.body;
        const { projectImage } = req.files;
        // console.log(projectImage);
        const processedProject = Array.isArray(project.title)
            ? project.title.map((_, index) => ({
                title: project.title[index],
                image: projectImage[index].filename,
                details: project.details[index],
                category: project.category[index],
                previewLink: project.preview[index],
            }))
            : [
                {
                    title: project.title,
                    image: projectImage[0].filename,
                    details: project.details,
                    category: project.category,
                    previewLink: project.preview,
                },
            ];

        // Check if a document exists that matches the query
        const existingPortfolio = await portfolioSchema.findOne();
        if (existingPortfolio) {
            // Update the existing document
            existingPortfolio.projects = processedProject;

            await existingPortfolio.save();
        } else {
            // Create a new document
            const newPortfolio = new portfolioSchema({
                projects: processedProject,
            });

            await newPortfolio.save();
        }
        res.status(200).json('Data saved successfully.');

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
    // })
}


// get portfolio data from db 
const getPortfolio = async (req, res) => {
    try {
        const portfolioData = await portfolioSchema.findOne({});

        if (portfolioData) {
            res.status(200).json(portfolioData);
        } else {
            res.status(404).json({ message: 'No portfolio data found.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


module.exports = { portfolio, getPortfolio };