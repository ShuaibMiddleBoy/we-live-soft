const express = require('express');
const router = express.Router();
const {upload, multipleUpload} = require('../uploadFile');
const {services, getServices} = require("../controllers/servicesController");


router.post('/services', multipleUpload, services)
router.route('/services').get(getServices);


module.exports = router;