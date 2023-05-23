import ProductOrder from '../models/productOrderModel.js';
import createError from 'http-errors';

//===========================================================
// The user has the mandate to post product order to database
//===========================================================

export const placeOrder = async (req, res, next) => {
  try {
    const newProductOrder = new ProductOrder({
      orderItems: req.body.orderItems.map((item) => ({
        ...item,
        product: item._id,
      })),
      shippingAddress: req.body.shippingAddress,
      paymentMethod: req.body.paymentMethod,
      itemsPrice: req.body.itemsPrice,
      shippingPrice: req.body.shippingPrice,
      taxPrice: req.body.taxPrice,
      totalPrice: req.body.totalPrice,
      user: req.user._id, //! I will do it later on
    });

    const productOrder = await newProductOrder.save();
    res
      .status(201)
      .send({ message: 'New Product Order Created:', productOrder });
  } catch (error) {
    console.log(error);
    next(createError(404, 'Product Order is not placed. Please try again?'));
  }
};

//===========================================================
// The user has the mandate to update an order
//===========================================================
export const updateOrder = async (req, res, next) => {};

//===========================================================
// The user and admin have the mandate to get an order
//===========================================================
export const getOneOrder = async (req, res, next) => {
  try {
    const order = await ProductOrder.findById(req.params.id);
    res.status(200).send(order);
  } catch (error) {
    console.log(error);
    next(
      createError(
        404,
        'All ordered products could not be accessed. Please try again?'
      )
    );
  }
};

//===================================================================
// orders history of a single user
//===================================================================
export const singleUserOrders = async (req, res, next) => {
  try {
    const orders = await ProductOrder.find({ user: req.user._id });
    return res.status(200).send(orders);
  } catch (error) {
    console.log(error);
    next(createError(500, "Database couldn't be queried. Please try again!"));
  }
};

//===========================================================
// The user and admin have the mandate to get all orders
//===========================================================
export const getAllOrders = async (req, res, next) => {
  try {
    const orders = await ProductOrder.find();
    res.status(200).json(orders);
  } catch (error) {
    console.log(error);
    next(
      createError(
        404,
        'All ordered products could not be accessed. Please try again?'
      )
    );
  }
};

//===========================================================
// Admin has the mandate to count all orders in the database
//===========================================================
export const countAllOrders = async (req, res, next) => {};

//===========================================================
// Admin & user have mandate to delete an order
//===========================================================
export const deleteOneOrder = async (req, res, next) => {};

//===========================================================
// Admin has the mandate to delete all orders from database
//===========================================================
export const deleteAllOrders = async (req, res, next) => {};
