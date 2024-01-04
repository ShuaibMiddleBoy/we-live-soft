const express = require('express');
const router = express.Router();
const {upload, multipleUpload} = require('../uploadFile');
const {createHome, getHome} = require("../controllers/homeController");



router.post('/home', upload.single('image'), createHome);
router.route('/home').get(getHome);


module.exports = router;