// Import necessary modules
require('dotenv').config();
const express = require('express');
require('./DBConn/__db');
const bodyParser = require('body-parser');
const UserRoutes = require("./routes/routes");
const authRoutes = require('./routes/authRoutes');
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

app.use('/api', UserRoutes);
app.use('/api/v1/auth', authRoutes);

// Define the port for your server
const PORT = process.env.PORT;



app.listen(PORT, () => {
    console.log(`Server start at port no ${PORT}`);
})
