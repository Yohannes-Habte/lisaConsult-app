import express from "express";
import { PayPalPayment, stripePayment } from "../controllers/paymentController.js";

const paymentRouter = express.Router()

// Routes

paymentRouter.put('/:id/pay', PayPalPayment);
paymentRouter.post("/", stripePayment)

export default paymentRouter;