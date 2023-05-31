import express from 'express';
import {
  countAllUsers,
  createUser,
  deleteAlllUsers,
  deleteOnelUser,
  getAllUsers,
  getOneUser,
  loginUser,
  updateUser,
  updateUserProfile,
} from '../controllers/userController.js';
import { adminAuth, userAuth } from '../middlewares/verification.js';

const userRouter = express.Router();

// User Routes
userRouter.post('/register', createUser);
userRouter.post('/login', loginUser);
userRouter.put('/profile/update', updateUserProfile);
userRouter.put('/update/:id', updateUser);
userRouter.get('/:id', userAuth, getOneUser);
userRouter.get('/', getAllUsers);
userRouter.get('/count/allUsers', adminAuth, countAllUsers);
userRouter.delete('/:id', deleteOnelUser);
userRouter.delete('/', adminAuth, deleteAlllUsers);

// Export Router
export default userRouter;
