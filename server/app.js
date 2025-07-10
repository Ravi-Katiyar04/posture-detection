import express from 'express';
import cors from 'cors';
import uploadRoutes from './routes/uploadRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.use('/api/upload', uploadRoutes);

export default app;

