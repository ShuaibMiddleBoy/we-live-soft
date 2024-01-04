// Import necessary modules
require('dotenv').config();
const express = require('express');
require('./DBConn/__db');
const bodyParser = require('body-parser');
const menuRoutes = require("./routes/menuRoutes");
const authRoutes = require('./routes/authRoutes');
const contactFormRoutes = require('./routes/contactFormRoutes');
const contactInfoRoutes = require('./routes/contactInfoRoutes');
const homeRoutes = require('./routes/homeRoutes');
const servicesRoutes = require('./routes/servicesRoutes');
const portfolioRoutes = require('./routes/portfolioRoutes');
const resumeRoutes = require('./routes/resumeRoutes');
const cors = require('cors');
const path = require('path');



// Initialize Express app
const app = express();

app.use('/public/images', express.static(path.join(__dirname, '../public/images')));

// middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());         // to avoid cors errors
app.use(express.json());

app.use('/api/v1', menuRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1', contactFormRoutes);
app.use('/api/v1', contactInfoRoutes);
app.use('/api/v1', homeRoutes);
app.use('/api/v1', servicesRoutes);
app.use('/api/v1', portfolioRoutes);
app.use('/api/v1',resumeRoutes);


// Define the port for your server
const PORT = process.env.PORT;



app.listen(PORT, () => {
    console.log(`Server start at port no ${PORT}`);
})
