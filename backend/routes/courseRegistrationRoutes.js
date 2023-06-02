import express from 'express';
import {
  countRegisteredCourses,
  courseRegistration,
  deleteRegisteredCourse,
  deleteRegisteredCourses,
  getRegisteredCourse,
  getRegisteredCourses,
  updateRegistration,
} from '../controllers/courseRegistrationController.js';
import { adminAuth, userAuth } from '../middlewares/verification.js';

// Course Router
const courseRegistrationRouter = express.Router();

// Routes
courseRegistrationRouter.post('/', userAuth, courseRegistration);
courseRegistrationRouter.put('/update/:id', userAuth, updateRegistration);
courseRegistrationRouter.get('/:id', userAuth, getRegisteredCourse);
courseRegistrationRouter.get('/', adminAuth, getRegisteredCourses);
courseRegistrationRouter.get('/count', adminAuth, countRegisteredCourses);
courseRegistrationRouter.delete('/:id', userAuth, deleteRegisteredCourse);
courseRegistrationRouter.delete('/', adminAuth, deleteRegisteredCourses);
// Export Router
export default courseRegistrationRouter; 
