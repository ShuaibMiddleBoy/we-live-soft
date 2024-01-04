const express = require('express');
const router = express.Router();
const {upload, multipleUpload} = require('../uploadFile');
const {resume, getResume} = require('../controllers/resumeController')




router.post('/resume', upload.single('resume'), resume);
router.route('/resume').get(getResume);



module.exports = router;
