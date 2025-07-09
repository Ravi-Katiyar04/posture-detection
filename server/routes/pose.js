const express = require('express');
const router = express.Router();
const { checkPosture } = require('../utils/checkPosture');

router.post('/analyze', (req, res) => {
  const { landmarks } = req.body;

  if (!landmarks) {
    return res.status(400).json({ error: 'Landmarks required' });
  }

  const feedback = checkPosture(landmarks);
  res.json({ feedback });
});

module.exports = router;
