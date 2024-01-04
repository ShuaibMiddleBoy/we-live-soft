const express = require('express');
const router = express.Router();
const {upload, multipleUpload} = require('../uploadFile');
const {menu, getMenu} = require('../controllers/menuController');
const { sendMailer } = require('../controllers/sendMailerController');




router.post('/menu', upload.single('logoImage'), menu)
router.route('/menu').get(getMenu);



// route for send mail to gmail 
router.post('/mail', sendMailer);


module.exports = router;


