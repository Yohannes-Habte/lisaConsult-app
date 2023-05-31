import React from 'react';
import './List.scss';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import CoursesTable from '../../components/tables/dataTable/CoursesTable';

const CourseList = () => {
  return (
    <main className="list-page">
      <Sidebar />

      <div className="list-container">
        <Navbar />
        <CoursesTable />
      </div>
    </main>
  );
};

export default CourseList;
