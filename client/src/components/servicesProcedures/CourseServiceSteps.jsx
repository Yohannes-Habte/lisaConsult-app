import React, { useContext, useEffect, useState } from 'react';
import './CervicesProcedures.scss';
import axios from 'axios';
import {
  BsFillArrowDownCircleFill,
  BsFillArrowUpCircleFill,
} from 'react-icons/bs';
import { PagesContext } from '../../context/pagesData/PagesProvider';
import { PROCEDURE_ACTION } from '../../context/pagesData/Reducer';
import ErrorMessage from '../utiles/ErrorMessage';
import Loading from '../utiles/Loading';
import MessageBox from '../utiles/MessageBox';

const CourseServiceSteps = () => {
  // Global state variable
  const { loading, error, procedures, dispatch } = useContext(PagesContext);

  // Local state variables
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
      dispatch({ type: PROCEDURE_ACTION.FETCH_PROCEURE_REQUEST });
      try {
        const { data } = await axios.get(
          process.env.REACT_APP_SERVER_URL + `/api/pages/procedures`
        );
        dispatch({
          type: PROCEDURE_ACTION.FETCH_PROCEURE_SUCCESS,
          payload: data,
        });
      } catch (error) {
        dispatch({
          type: PROCEDURE_ACTION.FETCH_PROCEURE_FAIL,
          payload: ErrorMessage(error),
        });
      }
    };
    fetchProcedureData();
  }, []);

  return (
    <section className="procedures-of-getting-services">
      {loading ? (
        <Loading />
      ) : error ? (
        <MessageBox variant="danger"> {error} </MessageBox>
      ) : (
        <article className="specific-service-procedure">
          <h3 className="sub-title">{procedures.courseStepsTitle}</h3>

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
            {procedures.courseStep1}
          </p>

          {/* Step Two */}
          <div className="step">
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
          </div>
          <p className={stepTwo ? 'display-step-two' : 'hide'}>
            {procedures.courseStep2}
          </p>

          {/* Step Three */}
          <div className="step">
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
          </div>
          <p className={stepThree ? 'display-step-three' : 'hide'}>
            {procedures.courseStep3}
          </p>

          {/* Step Four */}
          <div className="step">
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
          </div>
          <p className={stepFour ? 'display-step-four' : 'hide'}>
            {procedures.courseStep4}
          </p>

          {/* Step Five */}
          <div className="step">
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
          </div>
          <p className={stepFive ? 'display-step-five' : 'hide'}>
            {procedures.courseStep5}
          </p>

          {/* Step Six */}
          <div className="step">
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
          </div>
          <p className={stepSix ? 'display-step-six' : 'hide'}>
            {procedures.courseStep6}
          </p>
        </article>
      )}
    </section>
  );
};

export default CourseServiceSteps;
