import ProductOrder from "../models/productOrderModel.js";

//===================================================================
// Payment using PayPal
//===================================================================

export const payOrderPayPal = async (req, res, next) => {
    try {
      const orderedProduct = await ProductOrder.findById(req.params.id);
      if (order) {
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
          id: req.body.id,
          status: req.body.status,
          update_time: req.body.update_time,
          email_address: req.body.email_address,
        };
  
        const updatedProductOrder = await orderedProduct.save();
        return res
          .status(200)
          .send({ message: 'Order successfully paid!', orderedProduct: updatedProductOrder });
      } else {
        return res.status(402).send({ message: 'Order not found.' });
      }
    } catch (error) {
      console.log(error);
      next(createError(404, 'Database could not be queried. Please try again?'));
    }
  };
  