import Product from '../models/productModel.js';
import createError from "http-errors"

//===========================================================
// Admin has the mandate to post new Product to database
//===========================================================
export const createProduct = async (req, res, next) => {
  const newProduct = new Product(req.body);
  try {
    const saveNewProduct = await newProduct.save();
    return res.status(201).json(saveNewProduct);
  } catch (error) {
    console.log(error);
    return next(
      createError(500, 'New product is not created. Please try again!')
    );
  }
};

//===========================================================
// Admin has the mandate to update product details
//===========================================================
export const updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );
    return res.status(200).json(product);
  } catch (error) {
    console.log(error);
    return next(
      createError(500, 'Product could not be updated. Please try again!')
    );
  }
};

//===========================================================
// Get a product from the database
//===========================================================
export const getOneProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    return res.status(200).json(product);
  } catch (error) {
    console.log(error);
    return next(
      createError(500, 'Product could not be accessed. Please try again!')
    );
  }
};

//===========================================================
// Get all products from the database
//===========================================================
export const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    return res.status(200).json(products);
  } catch (error) {
    console.log(error);
    return next(
      createError(500, 'Products could not be accessed. Please try again!')
    );
  }
};

//===========================================================
// Admin has the mandate to count all products in the database
//===========================================================
export const countAllProducts = async (req, res, next) => {
  try {
    const counts = await Product.countDocuments();
    return res.status(200).json(counts);
  } catch (error) {
    console.log(error);
    return next(
      createError(
        500,
        'The size of all products could not be accessed. Please try again!'
      )
    );
  }
};

//===========================================================
// Admin has the mandate to delete a product from database
//===========================================================
export const deleteOneProduct = async (req, res, next) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json('Product has been successfully deleted!');
  } catch (error) {
    console.log(error);
    next(createError(500, 'Product could not be deleted. Please try again!'));
  }
};

//===========================================================
// Admin has the mandate to delete all products from database
//===========================================================
export const deleteAllProducts = async (req, res, next) => {
  try {
    await Product.deleteMany();
    res.status(200).json('Products have been successfully deleted!');
  } catch (error) {
    console.log(error);
    next(createError(500, 'Products could not be deleted. Please try again!'));
  }
}; 
