import express from 'express';
import multer from 'multer';
import path from 'path';

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Save to /uploads
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});
const upload = multer({ storage });

const router = express.Router();
router.post('/', upload.single('video'), (req, res) => {
  console.log(' Video uploaded:', req.file.filename);
  res.json({ success: true, filePath: `/uploads/${req.file.filename}` });
});

export default router;




