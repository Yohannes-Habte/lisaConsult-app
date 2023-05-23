import React, { useState, useContext, useRef } from 'react';
import { myContext } from '../../App';
//import 'react-phone-number-input/style.css'
//import PhoneInput, { formatPhoneNumber } from 'react-phone-number-input'
import './CourseRegistration.scss';
import { Helmet } from 'react-helmet-async';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { CourseContext } from '../../context/course/CourseProvider';
import { COURSE_ACTION } from '../../context/course/CourseReducer';

const CourseRegistration = () => {
  const navigate = useNavigate();

  // Global state variables
  const { dispatch } = useContext(CourseContext);
  // State Variables
  const [name, setName] = useState('');
  const [start, setStart] = useState('');

  // function that is used to update the state variables of the registration form
  const updateChange = (event) => {
    switch (event.target.name) {
      case 'name':
        setName(event.target.value);
        break;
      case 'start':
        setStart(event.target.value);
        break;

      default:
        break;
    }
  };

  // Function that reset all the state variables
  const reset = () => {
    setName('');
    setStart('');
  };

  // Function to sumit user registered for a course
  const hadleSubmit = async (event) => {
    event.preventDefault();

    if (!name) {
      toast.error('Please enter course name!');
    } else if(!start) {
      toast.error('Please enter the starting date!');
    } else {
      try {
        const newCourse = {
          name: name,
          start: start,
        };
        dispatch({ type: COURSE_ACTION.ADD_COURSE, payload: newCourse });
        localStorage.setItem('course', JSON.stringify(newCourse));
        navigate('/studentAddress');
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  return (
    <main className="course-registration-page">
      <Helmet>
        <title> Course Registration</title>
      </Helmet>

      <h1 className="course-registration-title">
        Welcome to Your Favorite Course
      </h1>
      <fieldset className="fieldset">
        <legend className="legend">Course Registration Form</legend>
        <form onSubmit={hadleSubmit} className="form">
          <div className="label-input">
            <label className="label" htmlFor="name">
              Course Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              onChange={updateChange}
              value={name}
              className="input"
            />
          </div>

          <div className="label-input">
            <label className="label" htmlFor="start">
              Starting Date
            </label>
            <input
              type="text"
              name="start"
              id="start"
              onChange={updateChange}
              value={start}
              placeholder="DD / MM / YY"
              className="input"
            />
          </div>

          <button className="button">Submit</button>
        </form>
      </fieldset>
    </main>
  );
};

export default CourseRegistration;
