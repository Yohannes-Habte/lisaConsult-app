import User from '../models/userModel.js';
import createError from 'http-errors';
import bcrypt from 'bcryptjs';
import { generateToken } from '../middlewares/verification.js';

//===========================================================
// Register a new user in the database
//===========================================================
export const createUser = async (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    password,
    phone,
    address,
    country,
    image,
    isAdmin,
  } = req.body;
  try {
    const user = await User.findOne({ email: email });

    if (user) {
      return next(
        createError(400, 'User already exist. Please user another email!')
      );
    }

    if (!user) {
      const newUser = new User({
        image: image,
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        phone: phone,
        address: address,
        country: country,
        isAdmin: isAdmin,
      });

      const userSavedInDB = await newUser.save();

      res.status(201).json({
        _id: userSavedInDB._id,
        firstName: userSavedInDB.firstName,
        lastName: userSavedInDB.lastName,
        email: userSavedInDB.email,
        image: userSavedInDB.image,
        phone: userSavedInDB.phone,
        address: userSavedInDB.address,
        country: userSavedInDB.country,
        isAdmin: userSavedInDB.isAdmin,
        token: generateToken(userSavedInDB),
      });

      // // Token
      // const token = generateToken(savedUser);

      // // Send HTTP-only cookie to the client in the frontend and also the user data
      // return res
      //   .cookie('access_token', token, {
      //     httpOnly: true,
      //     expires: new Date(Date.now() + 1000 * 86400),
      //     sameSite: 'none',
      //     secure: true,
      //   })
      //   .status(201)
      //   .json({ savedUser });
    }
  } catch (error) {
    console.log(error);
    next(createError(500, 'User could not sign up. Please try again!'));
  }
};

//===========================================================
// Log in a register user in the database
//===========================================================
export const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return next(
        createError(400, 'This email does not exist. Please sign up!')
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return next(createError(400, 'Invalid password! Please try again.'));
    }

    if (user && isPasswordValid) {
      const { password, isAdmin, ...otherDetails } = user._doc;

      res.status(200).json({
        // _id: user._id,
        // firstName: user.firstName,
        // lastName: user.lastName,
        // email: user.email,
        // image: user.image,
        // phone: user.phone,
        // address: user.address,
        // country: user.country,
        // isAdmin: user.isAdmin,

        details: { ...otherDetails },
        isAdmin,
        token: generateToken(user),
      });

      // // Token
      // const token = generateToken(user);

      // // Now, the cookies and the usere data willl be sent to the frontend
      // return res
      //   .cookie('access_token', token, {
      //     httpOnly: true,
      //     expires: new Date(Date.now() + 1000 * 86400),
      //     sameSite: 'none',
      //     secure: true,
      //   })
      //   .status(200)
      //   .json({ ...otherDetails, isAdmin });
    }
  } catch (error) {
    console.log(error);
    next(createError(500, 'User could not log in. Please try again!'));
  }
};

//=====================================================================
// Update User Profile
//=====================================================================
export const updateUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (user) {
      user.firstName = req.body.firstName || user.firstName;
      user.lastName = req.body.lastName || user.lastName;
      user.email = req.body.email || user.email;
      user.password = req.body.password || user.password;

      const updatedUser = await user.save();
      return res.send({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        token: generateToken(updatedUser),
      });
    } else {
      res.status(404).send({ message: 'User not found' });
    }
  } catch (error) {
    console.log(error);
    return next(
      createError(500, 'Database could not queried. Please try again!')
    );
  }
};

//===========================================================
// Owner and admin has mandate to update user details
//===========================================================
export const updateUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    next(createError(400, 'User could not be updated. Please try again!'));
  }
};

//===========================================================
// Get one user from the database
//===========================================================
export const getOneUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    next(createError(400, 'User could not be accessed. Please try again!'));
  }
};

//===========================================================
// Admin has mandate to get all users from the database
//===========================================================
export const getAllUsers = async (req, res, next) => {
  try {
    const user = await User.find();
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    next(
      createError(400, 'User unable to access all users. Please try again!')
    );
  }
};

//===========================================================
// Admin has mandate to get all users's count in database
//===========================================================
export const countAllUsers = async (req, res, next) => {
  try {
    const user = await User.countDocuments();
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    next(
      createError(
        400,
        'You are unable to access the size of the users. Please try again!'
      )
    );
  }
};

//===========================================================
// Owner and admin has mandate to delete a user from database
//===========================================================
export const deleteOnelUser = async (req, res, next) => {
  const user = await User.findById(req.params.id);
  try {
    await User.findByIdAndDelete(req.params.id);
    res
      .status(200)
      .json(`${user.firstName} has been successfully deleted. Welcome back!`);
  } catch (error) {
    console.log(error);
    next(createError(400, 'User could not be deleted. Please try again!'));
  }
};

//===========================================================
// Admin has mandate to delete delete all users from the database
//===========================================================
export const deleteAlllUsers = async (req, res, next) => {
  try {
    await User.deleteMany();
    res.status(200).json('All users has been successfully deleted!');
  } catch (error) {
    console.log(error);
    next(createError(400, 'Users could not be deleted. Please try again!'));
  }
};
