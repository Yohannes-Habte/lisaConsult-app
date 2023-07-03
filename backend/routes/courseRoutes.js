import express from 'express';
import {
  countAllCourses,
  deleteAllCourses,
  deleteOneCourse,
  getAllCourses,
  getOneCourse,
  registerCourse,
  updateCourse,
} from '../controllers/courseController.js';
import { adminAuth } from '../middlewares/verification.js';

// Course Router
const courseRouter = express.Router();

// Routes
courseRouter.post('/createCourse', registerCourse);
courseRouter.put('/', adminAuth, updateCourse);
courseRouter.get('/:id', getOneCourse);
courseRouter.get('/', getAllCourses);
courseRouter.get('/countCourses', adminAuth, countAllCourses);
courseRouter.delete('/:id', deleteOneCourse);
courseRouter.delete('/', adminAuth, deleteAllCourses);
// Export Router
export default courseRouter;
