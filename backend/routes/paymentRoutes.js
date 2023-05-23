import express from "express";
import { payOrderPayPal } from "../controllers/paymentController.js";

const paymentRouter = express.Router()

// Routes

paymentRouter.put('/:id/pay', payOrderPayPal);


export default paymentRouter;