import React, { useContext, useEffect, useState } from 'react';
import './CervicesProcedures.scss';
import axios from 'axios';
import {
  IoIosArrowDown,
  IoIosArrowUp,
} from 'react-icons/io';
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
    <article className="procedures-of-getting-services">
      {loading ? (
        <Loading />
      ) : error ? (
        <MessageBox variant="danger"> {error} </MessageBox>
      ) : (
        <section className="specific-service-procedure">
          <h3 className="sub-title">{procedures.courseStepsTitle}</h3>

          {/* Step 1 */}
          <section className="step">
            <h3
              onClick={() => setStepOne(!stepOne)}
              className={stepOne ? 'step-title' : 'default'}
            >
              Step One
            </h3>
            {stepOne? (
              <IoIosArrowUp
                onClick={() => setStepOne(!stepOne)}
                className="up-arrow"
              />
            ) : (
              <IoIosArrowDown
                onClick={() => setStepOne(!stepOne)}
                className="down-arrow"
              />
            )}

            {stepOne && <p className="paragraph"> {procedures.courseStep1} </p>}
          </section>

          {/* Step Two */}
          <section className="step">
            <h3
              onClick={() => setStepTwo(!stepTwo)}
              className={stepTwo ? 'step-title' : 'default'}
            >
              Step Two
            </h3>
            {stepTwo ? (
              <IoIosArrowUp
                onClick={() => setStepTwo(!stepTwo)}
                className="up-arrow"
              />
            ) : (
              <IoIosArrowDown
                onClick={() => setStepTwo(!stepTwo)}
                className="down-arrow"
              />
            )}

            {stepTwo && <p className="paragraph"> {procedures.courseStep2} </p>}
          </section>     

          {/* Step Three */}
          <section className="step">
            <h3
              onClick={() => setStepThree(!stepThree)}
              className={stepThree ? 'step-title' : 'default'}
            >
              Step Three
            </h3>
            {stepThree ? (
              <IoIosArrowUp
                onClick={() => setStepThree(!stepThree)}
                className="up-arrow"
              />
            ) : (
              <IoIosArrowDown
                onClick={() => setStepThree(!stepThree)}
                className="down-arrow"
              />
            )}

            {stepThree && <p className="paragraph"> {procedures.courseStep3} </p>}
          </section>

          {/* Step Four */}
          <section className="step">
            <h3
              onClick={() => setStepFour(!stepFour)}
              className={stepFour ? 'step-title' : 'default'}
            >
              Step Four
            </h3>
            {stepFour ? (
              <IoIosArrowUp
                onClick={() => setStepFour(!stepFour)}
                className="up-arrow"
              />
            ) : (
              <IoIosArrowDown
                onClick={() => setStepFour(!stepFour)}
                className="down-arrow"
              />
            )}

            {stepFour && <p className="paragraph"> {procedures.courseStep4} </p>}
          </section>

          {/* Step Five */}
          <section className="step">
            <h3
              onClick={() => setStepFive(!stepFive)}
              className={stepFive ? 'step-title' : 'default'}
            >
              Step Five
            </h3>
            {stepFive ? (
              <IoIosArrowUp
                onClick={() => setStepFive(!stepFive)}
                className="up-arrow"
              />
            ) : (
              <IoIosArrowDown
                onClick={() => setStepFive(!stepFive)}
                className="down-arrow"
              />
            )}

            {stepFive && <p className="paragraph"> {procedures.courseStep5} </p>}
          </section>

          {/* Step Six */}
          <section className="step">
            <h3
              onClick={() => setStepSix(!stepSix)}
              className={stepSix ? 'step-title' : 'default'}
            >
              Step Six
            </h3>
            {stepSix ? (
              <IoIosArrowUp
                onClick={() => setStepSix(!stepSix)}
                className="up-arrow"
              />
            ) : (
              <IoIosArrowDown
                onClick={() => setStepTwo(!stepSix)}
                className="down-arrow"
              />
            )}

            {stepSix && <p className="paragraph"> {procedures.courseStep6} </p>}
          </section>
          
        </section>
      )}
    </article>
  );
};

export default CourseServiceSteps;
