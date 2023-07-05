import React, { useContext, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import './Courses.scss';
import { Helmet } from 'react-helmet-async';
import { PagesContext } from '../../context/pagesData/PagesProvider';
import { COURSE_ACTION } from '../../context/pagesData/Reducer';
import ErrorMessage from '../../components/utiles/ErrorMessage';
import Loading from '../../components/utiles/Loading';
import MessageBox from '../../components/utiles/MessageBox';

const Courses = () => {
  // Global State variables
  const { loading, error, courses, dispatch } = useContext(PagesContext);

  // using useEffect hook display service data from the backend to the frontend
  useEffect(() => {
    const fetchServiceData = async () => {
      dispatch({ type: COURSE_ACTION.FETCH_COURSE_REQUEST });
      try {
        const { data } = await axios.get(
          process.env.REACT_APP_SERVER_URL + `/api/courses`
        );
        dispatch({ type: COURSE_ACTION.FETCH_COURSE_SUCCESS, payload: data });
      } catch (error) {
        dispatch({
          type: COURSE_ACTION.FETCH_COURSE_FAIL,
          payload: ErrorMessage(error),
        });
      }
    };
    fetchServiceData();
  }, []);

  return (
    <main className="course-page">
      <Helmet>
        <title> Courses </title>
      </Helmet>

      <section className="course-page-container">
        <h1 className="course-page-title"> Courses in LisaConsult </h1>

        {loading ? (
          <Loading />
        ) : error ? (
          <MessageBox variant="danger"> {error} </MessageBox>
        ) : (
          <div className="courses-container">
            {courses.map((course, index) => {
              return (
                <section key={index} className="course">
                  <h2 className="course-title"> {course.name} </h2>
                  <div>
                    <p className="description"> {course.description} </p>
                    <div className="join-us-link-container">
                      <NavLink to="/course" className="join-link">
                        Register Now
                      </NavLink>
                    </div>
                  </div>
                </section>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
};

export default Courses;
