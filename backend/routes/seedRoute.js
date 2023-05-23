import express from 'express';
import createProducts from '../controllers/seedController.js';

const seedRouter = express.Router();

seedRouter.get('/', createProducts);

export default seedRouter;
