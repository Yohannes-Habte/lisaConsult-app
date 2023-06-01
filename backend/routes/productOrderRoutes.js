import express from 'express';
import {
  countAllOrders,
  deleteAllOrders,
  deleteOneOrder,
  getAllOrders,
  getOneOrder,
  placeOrder,
  singleUserOrders,
  updateOrder,
} from '../controllers/productOrderController.js';
import { adminAuth, userAuth } from '../middlewares/verification.js';


// Router
const productOrderRouter = express.Router();

// Order Routes
productOrderRouter.post('/', placeOrder);
productOrderRouter.put('/:id', updateOrder);
productOrderRouter.get('/:id', getOneOrder);
productOrderRouter.get("/user/orders", userAuth, singleUserOrders)
productOrderRouter.get('/', adminAuth, getAllOrders);
productOrderRouter.get('/countOrder', adminAuth, countAllOrders);
productOrderRouter.delete('/:id', adminAuth, deleteOneOrder);
productOrderRouter.delete('/', adminAuth, deleteAllOrders);

// Export order router
export default productOrderRouter;
