import React from 'react';
import './Procedure.scss';
import { Helmet } from 'react-helmet-async';
import CourseServiceSteps from '../../components/servicesProcedures/CourseServiceSteps';
import MealsOrderSteps from '../../components/servicesProcedures/MealsOrderSteps';

const Procedure = () => {
  return (
    <main className="procedure-page">
      <Helmet>
        <title> Procedures</title>
      </Helmet>
      <h1 className="procedure-page-title">Online Ordering Procedures </h1>

      <section className="service-ordering-processes">
        <CourseServiceSteps />

        <MealsOrderSteps />
      </section>
    </main>
  );
};

export default Procedure;
