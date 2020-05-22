const path = require('path');
const multer = require('multer');
const fs = require('fs');
const {
    IMAGE_PATH,
    IMAGE_MAX_SIZE
} = process.env;

let storage = multer.diskStorage({
    destination: (req, file, callback) => {
        if (!fs.existsSync(IMAGE_PATH)) fs.mkdirSync(IMAGE_PATH);

        callback(null, IMAGE_PATH);
    },
    filename: (req, file, callback) => {
        const filename = `${file.fieldname} - ${Date.now()}${path.extname(
      file.originalname
    )}`;
        callback(null, filename);
    },
});

const upload = multer({
    storage,
    limits: {
        files: 1,
        fileSize: IMAGE_MAX_SIZE,
    },
}).single('file');

module.exports = upload;