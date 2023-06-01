import CourseRegistration from '../models/courseRegistrationModel.js';
import createError from 'http-errors';

//==================================================================
// The user has the mandate to register for a course
//==================================================================
export const courseRegistration = async (req, res, next) => {
  const {course, studentAddress, paymentMethod} = req.body;
  try {
    const courseOrder = new CourseRegistration({
      course: course,
      studentAddress: studentAddress,
      paymentMethod: paymentMethod,
      // user: req.user._id,
    });

    const saveCourseOrder = await courseOrder.save();
    res.status(201).send({ saveCourseOrder });
  } catch (error) {
    console.log(error);
    next(createError(404, 'Course Order is not placed. Please try again?'));
  }
};

//===================================================================
// The user has the mandate to update an course registration
//===================================================================
export const updateRegistration = async (req, res, next) => {};

//====================================================================
// The user and admin have the mandate to get registered course
//====================================================================
export const getRegisteredCourse = async (req, res, next) => {};

//=====================================================================
// The user and admin have the mandate to get all registered courses
//=====================================================================
export const getRegisteredCourses = async (req, res, next) => {};

//======================================================================
// Admin has the mandate to count all registered courses
//======================================================================
export const countRegisteredCourses = async (req, res, next) => {};

//======================================================================
// Admin & user have mandate to delete a registered course
//======================================================================
export const deleteRegisteredCourse = async (req, res, next) => {};

//======================================================================
// Admin has the mandate to delete all registered courses
//======================================================================
export const deleteRegisteredCourses = async (req, res, next) => {};
