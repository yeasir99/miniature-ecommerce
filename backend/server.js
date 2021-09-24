import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import morgan from 'morgan';

import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoute.js';

dotenv.config();

connectDB();

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 8000;

app.listen(PORT, console.log(`Server running on port ${PORT}`));
