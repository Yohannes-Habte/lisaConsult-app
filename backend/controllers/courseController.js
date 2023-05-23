//===========================================================
// The user has the mandate to register a course
//===========================================================
export const registerCourse = async (req, res, next) => {};

//===========================================================
// The user has the mandate to update a course
//===========================================================
export const updateCourse = async (req, res, next) => {};

//===========================================================
// The user and admin have the mandate to get a course
//===========================================================
export const getOneCourse = async (req, res, next) => {};

//===========================================================
// Admin has the mandate to see all courses taken 
//===========================================================
export const getAllCourses = async (req, res, next) => {
  res.send("All orders are available!")
};

//===========================================================
// Admin has the mandate to count all courses in the database
//===========================================================
export const countAllCourses = async (req, res, next) => {};

//===========================================================
// Admin & user have mandate to delete a course
//===========================================================
export const deleteOneCourse = async (req, res, next) => {};

//===========================================================
// Admin has the mandate to delete all courses from database
//===========================================================
export const deleteAllCourses = async (req, res, next) => {};
