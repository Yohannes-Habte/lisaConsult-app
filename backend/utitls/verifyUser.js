import jwt from 'jsonwebtoken';
import createError from 'http-errors';
import User from '../models/userModel.js';

//=====================================================================
// Function that generate a token for the user
//=====================================================================
export const generateToken = (user) => {
  try {
    const userToken = jwt.sign(
      {
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    return userToken;
  } catch (err) {
    console.log(err);
  }
};


//=====================================================================
// User Auth
//=====================================================================

export const userAuth = (req, res, next) => {
  try {
    const authorization = req.headers.authorization;
    if (authorization) {
      const token = authorization.slice(7, authorization.length); 

      jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
        // decode keeps the user info
        if (err) {
          res.status(401).send({ message: 'Invalid Token' });
        } else {
          req.user = decode;
          next();
        }
      });
    } else {
      res.status(401).send({ message: 'No Token' });
    }
  } catch (error) {
    console.log(error);
    next(createError(403, 'User could not be authorized. Please try again'));
  }
};

//=====================================================================
// Function that Authorize an Admin
//=====================================================================
export const adminAuth = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).send({ message: 'Invalid Admin Token' });
  }
};