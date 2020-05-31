const path = require('path');
const multer = require('multer');
const fs = require('fs');
const store = require('../Persistence/postgres');

const {
  IMAGE_PATH,
  IMAGE_MAX_SIZE
} = process.env;

const DATA_TABLE_MEETINGS = 'meetings';

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
  fileFilter: async function (req, file, callback) {
    const meeting = await store.get(DATA_TABLE_MEETINGS, req.params.id);

    if (!meeting) return callback(new Error('meeting_id doesnt exists'));

    req.meeting = meeting;

    var ext = path.extname(file.originalname);
    if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg')
      return callback(new Error('Only images are allowed'));

    callback(null, true);
  },
  limits: {
    files: 1,
    fileSize: IMAGE_MAX_SIZE,
  },
}).single('file');

module.exports = upload;