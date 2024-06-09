import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import dot from 'dotenv';
import router from './routes';
import cors from 'cors';

dot.config();

const app = express();
const PORT = process.env.PORT || 3000;
const BD_STRING = String(process.env.MONGODB_URI) || 'mongodb://localhost:27017/mydatabase';

app.use(express.json());
app.use(cors());
mongoose.connect(BD_STRING, {
  dbName: 'to-do',
}).then(() => {
  console.log('Connected to MongoDB 🤞');
}).catch(err => {
  console.error('Error connecting to MongoDB 🤔', err);
});

app.use('/', router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} 👌`);
});