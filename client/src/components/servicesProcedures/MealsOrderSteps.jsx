import React, { useEffect, useState } from 'react';
import './CervicesProcedures.scss';
import axios from 'axios';
import {
  BsFillArrowDownCircleFill,
  BsFillArrowUpCircleFill,
} from 'react-icons/bs';

const MealsOrderSteps = () => {
  // Local state variables
  const [data, setData] = useState([]);
  const [stepOne, setStepOne] = useState(false);
  const [stepTwo, setStepTwo] = useState(false);
  const [stepThree, setStepThree] = useState(false);
  const [stepFour, setStepFour] = useState(false);
  const [stepFive, setStepFive] = useState(false);
  const [stepSix, setStepSix] = useState(false);

  // Handle click to display and hide each step
  const handleStepOne = () => {
    setStepOne(!stepOne);
  };

  const handleStepTwo = () => {
    setStepTwo(!stepTwo);
  };

  const handleStepThree = () => {
    setStepThree(!stepThree);
  };

  const handleStepFour = () => {
    setStepFour(!stepFour);
  };

  const handleStepFive = () => {
    setStepFive(!stepFive);
  };

  const handleStepSix = () => {
    setStepSix(!stepSix);
  };

  // Display service procedures in the frontend fetched from backend
  useEffect(() => {
    const fetchProcedureData = async () => {
      try {
        const { data } = await axios.get(
          process.env.REACT_APP_SERVER_URL + `/api/pages/procedures`
        );
        setData(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProcedureData();
  }, []);

  return (
    <section className="procedures-of-getting-services">
      <article className="specific-service-procedure">
        <h3 className="sub-title">{data.mealsStepsTitle}</h3>

        {/* Step One */}
        <article className="step">
          <h4 className="procedure-title"> Step One</h4>

          {stepOne ? (
            <BsFillArrowUpCircleFill
              onClick={handleStepOne}
              className="icon-up"
            />
          ) : (
            <BsFillArrowDownCircleFill
              onClick={handleStepOne}
              className="icon-down"
            />
          )}
        </article>
        <p className={stepOne ? 'display-step-one' : 'hide'}>
          {data.mealsStep1}
        </p>

        {/* Step Two */}
        <article className="step">
          <h4 className="procedure-title"> Step Two</h4>
          {stepTwo ? (
            <BsFillArrowUpCircleFill
              onClick={handleStepTwo}
              className="icon-up"
            />
          ) : (
            <BsFillArrowDownCircleFill
              onClick={handleStepTwo}
              className="icon-down"
            />
          )}
        </article>
        <p className={stepTwo ? 'display-step-two' : 'hide'}>
          {data.mealsStep2}
        </p>

        {/* Step Three */}
        <article className="step">
          <h4 className="procedure-title"> Step Three</h4>
          {stepThree ? (
            <BsFillArrowUpCircleFill
              onClick={handleStepThree}
              className="icon-up"
            />
          ) : (
            <BsFillArrowDownCircleFill
              onClick={handleStepThree}
              className="icon-down"
            />
          )}
        </article>
        <p className={stepThree ? 'display-step-three' : 'hide'}>
          {data.mealsStep3}
        </p>

        {/* Step Four */}
        <article className="step">
          <h4 className="procedure-title"> Step Four</h4>
          {stepFour ? (
            <BsFillArrowUpCircleFill
              onClick={handleStepFour}
              className="icon-up"
            />
          ) : (
            <BsFillArrowDownCircleFill
              onClick={handleStepFour}
              className="icon-down"
            />
          )}
        </article>
        <p className={stepFour ? 'display-step-four' : 'hide'}>
          {data.mealsStep4}
        </p>

        {/* Step Five */}
        <article className="step">
          <h4 className="procedure-title"> Step Five</h4>
          {stepFive ? (
            <BsFillArrowUpCircleFill
              onClick={handleStepFive}
              className="icon-up"
            />
          ) : (
            <BsFillArrowDownCircleFill
              onClick={handleStepFive}
              className="icon-down"
            />
          )}
        </article>
        <p className={stepFive ? 'display-step-five' : 'hide'}>
          {data.mealsStep5}
        </p>

        {/* Step Six */}
        <article className="step">
          <h4 className="procedure-title"> Step Six</h4>
          {stepSix ? (
            <BsFillArrowUpCircleFill
              onClick={handleStepSix}
              className="icon-up"
            />
          ) : (
            <BsFillArrowDownCircleFill
              onClick={handleStepSix}
              className="icon-down"
            />
          )}
        </article>
        <p className={stepSix ? 'display-step-six' : 'hide'}>
          {data.mealsStep6}
        </p>
      </article>
      <article></article>
    </section>
  );
};

export default MealsOrderSteps;
