import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import './Courses.scss';
import { Helmet } from 'react-helmet-async';

const Courses = () => {
  // State variables
  const [services, setServices] = useState([]);

  // using useEffect hook display service data from the backend to the frontend
  useEffect(() => {
    const fetchServiceData = async () => {
      try {
        const { data } = await axios.get(
          process.env.REACT_APP_SERVER_URL + `/api/pages/services`
        );
        setServices(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchServiceData();
  }, []);

  return (
    <main className="servicePage-container">
      <Helmet>
        <title> Courses </title>
      </Helmet>
      <h1 className="service-page-title"> Available Courses in LisaConsult </h1>

      <div className="courses-container">
        {services.map((course, index) => {
          return (
            <section key={index} className="course">
              <h2 className="course-title"> {course.courseTitle} </h2>
              <div>
                <p> {course.firstParagraph} </p>
                <p> {course.secondParagraph} </p>
                <div className="join-us-link-container">
                  <NavLink to="/course" className="join-link">
                    {course.link}
                  </NavLink>
                </div>
              </div>
            </section>
          );
        })}
      </div>
    </main>
  );
};

export default Courses;
