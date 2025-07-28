import cors from 'cors';
import express from 'express';
import imageRoutes from './controllers/imageController';
import { initDb } from './database/initDb';

initDb();
const app = express();
const port = process.env.PORT || '3030';

app.use(cors());

// Health check
app.get('/', (_req, res) => {
  res.send('Live.');
});

console.log(`This is port ${port}`);

// Image-related routes, could also put it in roures folder
app.use('/images', imageRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
