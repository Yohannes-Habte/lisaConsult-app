import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import morgan from 'morgan';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import colors from 'colors';
import multer from 'multer';

// Routes
import userRouter from './routes/userRoutes.js';
import productRouter from './routes/productRoutes.js';
import productOrderRouter from './routes/productOrderRoutes.js';
import globalErrorHandler from './middlewares/globalErrorHandler.js';
import pagesDataRouter from './routes/pagesDataRoutes.js';
import courseRouter from './routes/courseRoutes.js';
import courseRegistrationRouter from './routes/courseRegistrationRoutes.js';
import seedRouter from './routes/seedRoute.js';
import paymentRouter from './routes/paymentRoutes.js';

// Express app
const app = express();
app.use(cookieParser());
app.use(
  cors({
    origin: ['http://localhost:3000', 'http://lisaConsult-app'],
    credentials: true,
  })
);
app.use(express.json());

//! Step 2: create API for the paypal
app.get('/api/keys/paypal', (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || 'sb'); // sb stands for Sandbox
});

// mongoDB
dotenv.config();

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log('DB is connected!'.yellow.bold);
  } catch (error) {
    console.log(error);
  }
};

// End points
app.use('/api/pages', pagesDataRouter);
app.use('/api/seeds', seedRouter);
app.use('/api/auth', userRouter);
app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/productOrders', productOrderRouter);
app.use('/api/courses', courseRouter);
app.use('/api/courseRegistrations', courseRegistrationRouter);
app.use('/api/payment', paymentRouter);

// Static assets
app.use(express.static('assets'));

// Global error handler
app.use(globalErrorHandler);

// Port
const port = process.env.PORT || 8000;

// Server Listner
app.listen(port, () => {
  connectToMongoDB();
  console.log(`The server starts on port ${port}`.blue.bold);
});
