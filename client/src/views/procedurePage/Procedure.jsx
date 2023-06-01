import React, { useEffect, useState } from 'react';
import './Procedure.scss';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import {
  BsFillArrowDownCircleFill,
  BsFillArrowUpCircleFill,
} from 'react-icons/bs';

const About = () => {
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
    <main className="procedure-page">
      <Helmet>
        <title> Procedures</title>
      </Helmet>
      <h1 className="about-page-title">
        User-friendly Services Procedure at LisaConsult
      </h1>

      <section className="procedures-of-getting-services">
        {data.map((procedure) => {
          return (
            <article key={procedure._id} className="specific-service-procedure">
              <h3 className="sub-title">{procedure.title}</h3>

              {/* Step One */}
              <div className="step">
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
              </div>
              <p className={stepOne ? 'display-step-one' : 'hide'}>{procedure.step1}</p>

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
              <p className={stepTwo ? 'display-step-two' : 'hide'}> {procedure.step2}</p>

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
              <p className={stepThree ? 'display-step-three' : 'hide'}>{procedure.step3}</p>

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
              <p className={stepFour ? 'display-step-four' : 'hide'}>{procedure.step4}</p>

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
              <p className={stepFive ? 'display-step-five' : 'hide'}> {procedure.step5}</p>

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
              <p className={stepSix ? 'display-step-six' : 'hide'}> {procedure.step6}</p>
            </article>
          );
        })}
      </section>
    </main>
  );
};

export default About;
