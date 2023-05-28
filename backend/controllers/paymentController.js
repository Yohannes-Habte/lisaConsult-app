import ProductOrder from "../models/productOrderModel.js";
import Stripe from "stripe"

//===================================================================
// Payment using PayPal
//===================================================================

export const PayPalPayment = async (req, res, next) => {
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

 
//===================================================================
// Payment using Stripe
//===================================================================
export const stripePayment = async (req, res, next) => {
    try {
        const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY);
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            line_items: [
                {
                    price_data: {
                        currency: "EUR",
                        product_data: {
                            name: "Course Registration in LisaConsult"
                        },
                        unit_amount:+req.body.total *100,
                    },
                    quantity: 1
                }
            ],
            success_url:`http://localhost:3000/stripe-success`,
            cancel_url: `http://localhost:3000/stripe-cancel`
        }
        )
        //cancel_url: `${process.env.CLIENT_URL}/cancel.html`,
        res.json({ url: session.url })
    } catch (e) {
        res.status(500).json({ error: e.message })
    }
};
  