const servicesSchema = require('../models/servicesSchema')

// Route for handling form data
const services = async (req, res) => {

    try {
        const { services, feedbacks, plans } = req.body;
        const { servicesImage, clientsImage, feedbacksImage } = req.files;

        // Process services data
        const processedServices = Array.isArray(services.title)
            ? services.title.map((_, index) => ({
                serviceImage: servicesImage[index].filename, // Assuming you store file paths
                serviceTitle: services.title[index],
                serviceDesc: services.desc[index],
            }))
            : [
                {
                    serviceImage: servicesImage[0].filename,
                    serviceTitle: services.title,
                    serviceDesc: services.desc,
                },
            ];

        // // Process clients data
        const processedClients = clientsImage.map((client) => ({
            clientImage: client.filename, // Assuming you store file paths
        }));

        // Process feedbacks data
        const processedFeedbacks = Array.isArray(feedbacks.reviewer)
            ? feedbacks.reviewer.map((_, index) => ({
                image: feedbacksImage[index].filename, // Assuming you store file paths
                reviewer: feedbacks.reviewer[index],
                company: feedbacks.company[index],
                description: feedbacks.desc[index],
            }))
            : [
                {
                    image: feedbacksImage[0].filename,
                    reviewer: feedbacks.reviewer,
                    company: feedbacks.company,
                    description: feedbacks.desc,
                },
            ];

        // Process plans data
        const processedPlans = Array.isArray(plans.name)
            ? plans.name.map((_, index) => ({
                name: plans.name[index],
                price: plans.price[index],
                description: plans.desc[index],
            }))
            : [
                {
                    name: plans.name,
                    price: plans.price,
                    description: plans.desc,
                },
            ];

        // Check if a document exists that matches the query
        const existingService = await servicesSchema.findOne({});
        if (existingService) {
            // Update the existing document
            existingService.services = processedServices;
            existingService.clients = processedClients;
            existingService.feedbacks = processedFeedbacks;
            existingService.plans = processedPlans;

            await existingService.save();
        } else {
            // Create a new document
            const newService = new servicesSchema({
                services: processedServices,
                clients: processedClients,
                feedbacks: processedFeedbacks,
                plans: processedPlans,
            });

            await newService.save();
        }
        res.status(200).json('Data saved successfully.');
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
    // });
};


// get services data from db 
const getServices = async (req, res) => {
    try {
        const servicesData = await servicesSchema.findOne(); // Retrieve services data

        if (servicesData) {
            res.status(200).json(servicesData);
        } else {
            res.status(404).json({ message: 'No services data found.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { services, getServices };
