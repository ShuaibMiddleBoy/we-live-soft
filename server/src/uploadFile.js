const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const filePath = path.join(__dirname, '../public/images');
// console.log(filePath);
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, filePath);
    },
    filename: (req, file, cb) => {
        cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname));
    },
});

const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};
const upload = multer({ storage, fileFilter });


// for multiple images
const uploadd = multer({ storage: storage });
const multipleUpload = uploadd.fields([
    { name: 'servicesImage', maxCount: 20 },
    { name: 'clientsImage', maxCount: 20 },
    { name: 'feedbacksImage', maxCount: 20 },
    { name: 'projectImage', maxCount: 100 },
])



module.exports = {upload, multipleUpload};
