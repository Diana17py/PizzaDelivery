const multer = require('multer');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const path = `uploads/${req.decodedUserId}/`
    fs.mkdirSync(path, { recursive: true })
    req.userAvatarPath = path;
    cb(null, path );
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

module.exports = upload;