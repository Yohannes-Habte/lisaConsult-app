import Product from '../models/productModel.js';
import data from '../data.js';
import User from '../models/userModel.js';

const createProducts = async (req, res, next) => {
  // Delete the previous product model data
  await Product.deleteMany({});

  // Insert products data to product model
  const products = await Product.insertMany(data.products);

  // Delete the previous users from the user model
  await User.deleteMany({});

  // Insert users from the static data to the User model
  const users = await User.insertMany(data.users);

  res.send({ users, products });
};

export default createProducts;
