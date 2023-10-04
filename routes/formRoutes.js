const express = require('express');
const multer = require('multer');
const path = require('path');
const formController = require('../controllers/formController');
const router = express.Router();

// Middleware utilisant multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    // Vérifiez le type de fichier si nécessaire
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Le fichier doit être une image.'));
    }
  }
});

// Routes
router.post('/register', upload.single('image'), formController.register);

module.exports = router;
