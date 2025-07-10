import express from 'express';
import multer from 'multer';
import path from 'path';
import { exec } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Setup multer to save videos
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});
const upload = multer({ storage });

const router = express.Router();

// POST /api/analyze
router.post('/', upload.single('video'), (req, res) => {
  if (!req.file) return res.status(400).json({ success: false, message: 'No file uploaded' });

  const filePath = `uploads/${req.file.filename}`;
  const absPath = path.join(__dirname, '..', filePath);
  const pythonScript = path.join(__dirname, '../processors/analyze_posture.py');

  // Call Python script
  exec(`python "${pythonScript}" "${absPath}"`, (err, stdout, stderr) => {
    if (err) {
      console.error('Python Error:', stderr);
      return res.status(500).json({ success: false, message: 'Analysis failed' });
    }

    try {
      const result = JSON.parse(stdout);
      res.json({ success: true, filePath: `/${filePath}`, analysis: result });
    } catch (e) {
      console.error('Parsing error:', e);
      res.status(500).json({ success: false, message: 'Invalid analysis output' });
    }
  });
});

export default router;