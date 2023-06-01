import createError from 'http-errors';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

//=====================================================================
// Generate token
//=====================================================================
export const generateToken = (user) => {
  const token = jwt.sign(
    {
      id: user._id,
      isAdmin: user.isAdmin,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      image: user.image,
      phone: user.phone,
      address: user.address,
      country: user.country,
    },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );
  return token;
};

//=====================================================================
// User Auth
//=====================================================================

export const userAuth = async (req, res, next) => {
  try {
    //const token = req.cookies.token;
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      res.status(401);
      throw new Error('User unauthorized! Please login!');
    }

    const VerifiedToken = jwt.verify(token, process.env.JWT_SECRET);
    // Get user id from the token
    const user = await User.findById(VerifiedToken.id);

    if (user) {
      // If the user found, save the user in the req.user, which is equal to the user in the database
      req.user = user;
      next();
    } else {
      res.status(401);
      throw new Error('User is not authorized!');
    }
  } catch (err) {
    console.log(err);
  }
};

//===========================================================
// User Authentication and Authorization
//===========================================================
export const userAuthNotForNow = async (req, res, next) => {
  try {
    // const token = req.cookies.access_token;
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      return next(createError(401, 'User is not authonticated! Please login!'));
    }

    // If token exist, decode it
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    // Find user from the database
    const user = await User.findById(decodedToken.id);
    if (user.id === req.params.id || user.isAdmin) {
      next();
    } else {
      return next(createError(403, 'User is not authorized!'));
    }
  } catch (error) {
    console.log(error);
    next(createError(403, 'User could not be authorized. Please try again'));
  }
};

//===========================================================
// Admin Authentication and Authorization
//===========================================================

export const adminAuth = async (req, res, next) => {
  try {
    //const token = req.cookies.access_token;
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      return next(createError(401, 'User is not authonticated! Please login!'));
    }

    // If token exist, decode it
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    // Find user from the database
    const user = await User.findById(decodedToken.id);
    if (user && user.isAdmin) {
      next();
    } else {
      return next(createError(403, 'User unauthorized!'));
    }
  } catch (error) {
    console.log(error);
    next(createError(403, 'Admin is the only one who is authorized!'));
  }
};
