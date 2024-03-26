import React from 'react'
import "./CoursesPage.scss"
import Header from '../../components/user/layout/header/Header'

const CoursesPage = () => {
  return (
    <main className="Course-page">
    <Header />
    <article className="Course-page-container">
      <h1 className="Course-page-title"> Courses </h1>
    </article>
  </main>
  )
}

export default CoursesPage