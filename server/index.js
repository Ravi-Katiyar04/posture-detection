const express = require('express');
const cors = require('cors');
const poseRoutes = require('./routes/pose');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: '10mb' })); // to accept base64 images
app.use('/api/pose', poseRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
