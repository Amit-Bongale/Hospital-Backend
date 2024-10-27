const multer = require('multer');
const path = require('path');

// Configure Multer to store files on disk
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Temporary storage directory
  },
  filename: (req, file, cb) => {
    // Generate a unique filename: Date + Original Name + Extension
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const extension = path.extname(file.originalname);
    const filename = `${file.fieldname}-${uniqueSuffix}${extension}`;

    cb(null, filename);
  },
});

const upload = multer({storage : storage });

module.exports = upload;
