import React, { useState } from 'react';
import './New.scss';
import { FaCloudUploadAlt } from 'react-icons/fa';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import { courseInputs } from '../../data/DataFormSource';
import axios from 'axios';

const NewCourse = () => {
  const [courseInfo, setCourseInfo] = useState({});

  // Handle change fuction
  const handleChange = (e) => {
    setCourseInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Submit User Info
  const submitCourse = async (e) => {
    e.preventDefault();

    try {
      // New User
      const newUser = {
        name: courseInfo.name,
        price: courseInfo.price,
        language: courseInfo.language,
        description: courseInfo.description,
      };

      // Send the new user to backend
      await axios.post(
        process.env.REACT_APP_SERVER_URL + '/api/courses/createCourse',
        newUser
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="new-page">
      <Sidebar />
      <section className="new-page-container">
        <Navbar />
        <article className="add-user-container">
          <h3 className="title"> Add New Course </h3>
        </article>
        <div className="form-container">
          <div className="right-cotainer">
            <form onSubmit={submitCourse} action="" className="form">
              {courseInputs.map((input) => {
                return (
                  <div key={input.id} className="input-container">
                    <input
                      type={input.type}
                      id={input.id}
                      name={input.name}
                      onChange={handleChange}
                      placeholder={input.placeholder}
                      className="input-field"
                    />
                    <label htmlFor="" className="input-label">
                      {input.label}
                    </label>
                    <span className="input-highlight"></span>
                  </div>
                );
              })}

              <div className="btn-container">
                <button className="btn">Send</button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
};

export default NewCourse;
