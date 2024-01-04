const express = require('express');
const router = express.Router();
const {upload, multipleUpload} = require('../uploadFile');
const {portfolio, getPortfolio} = require("../controllers/portfolioController");




router.post('/portfolio', multipleUpload, portfolio);
router.route('/portfolio').get(getPortfolio);


module.exports = router;