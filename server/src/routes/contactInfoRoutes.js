const express = require('express');
const router = express.Router();
const {upload, multipleUpload} = require('../uploadFile');

const {contactInfo, getContactInfo} = require("../controllers/contactInfoController");



router.post('/contactInfo', upload.single('image'), contactInfo)
router.route('/contactInfo').get(getContactInfo);



module.exports = router;