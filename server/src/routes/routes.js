const express = require('express');
const router = express.Router();
const {contactForm} = require('../controllers/contactForm');
const {menu, getMenu} = require('../controllers/menu');
const {resume, getResume} = require('../controllers/resume')
const {createHome, getHome} = require("../controllers/home");
const {services, getServices} = require("../controllers/services");
const {portfolio, getPortfolio} = require("../controllers/portfolio");
const {contactInfo, getContactInfo} = require("../controllers/contactInfo");
const {upload, multipleUpload} = require('../uploadFile');
const { sendMailer } = require('../controllers/sendMailer');

// sending datato db 
router.post('/home', upload.single('image'), createHome)
router.post('/menu', upload.single('logoImage'), menu)
router.post('/contactInfo', upload.single('image'), contactInfo)
router.post('/resume', upload.single('resume'), resume)
router.post('/services', multipleUpload, services)
router.post('/portfolio', multipleUpload, portfolio)
router.route('/contact').post(contactForm);

// getting data from db 
router.route('/home').get(getHome);
router.route('/menu').get(getMenu);
router.route('/resume').get(getResume);
router.route('/services').get(getServices);
router.route('/portfolio').get(getPortfolio);
router.route('/contactInfo').get(getContactInfo);


// route for send mail to gmail 
router.post('/mail', sendMailer);


module.exports = router;


