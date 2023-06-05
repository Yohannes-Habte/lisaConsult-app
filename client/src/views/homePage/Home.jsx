import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Home.scss';
import { useContext } from 'react';
import { PagesContext } from '../../context/pagesData/PagesProvider';
import { INVESTMENT_ACTION, TITLEDATA_ACTION } from '../../context/pagesData/Reducer';
import Loading from '../../components/utiles/Loading';
import Message from '../../components/utiles/MessageBox';
import { Helmet } from 'react-helmet-async';
import ErrorMessage from '../../components/utiles/ErrorMessage';

const Home = () => {
  // Global state variables
  const { titleData, investments, loading, error, dispatch } =
    useContext(PagesContext);

  // useEffect to display home page data fetched from the backend
  useEffect(() => {
    // Title part
    const fetchTitleData = async () => {
      dispatch({ type: TITLEDATA_ACTION.FETCH_TITLEDATA_REQUEST});
      try {
        const { data } = await axios.get(
          process.env.REACT_APP_SERVER_URL + `/api/pages/homePageTitle`
        );
        dispatch({
          type: TITLEDATA_ACTION.FETCH_TITLEDATA_SUCCESS,
          payload: data,
        }); 
      } catch (error) {
        console.log(error);
        dispatch({
          type: TITLEDATA_ACTION.FETCH_TITLEDATA_FAIL,
          payload: ErrorMessage(error)
        });
      }
    };
    fetchTitleData();

    // Investment systems
    const fetchInvestment = async () => {
      dispatch({ type: INVESTMENT_ACTION.FETCH_REQUEST });
      try {
        const { data } = await axios.get(
          process.env.REACT_APP_SERVER_URL + `/api/pages/investments`
        );
        dispatch({
          type: INVESTMENT_ACTION.FETCH_INVESTMENT_SUCCESS,
          payload: data,
        });
      } catch (error) {
        console.log(error);
        dispatch({
          type: INVESTMENT_ACTION.FETCH_FAIL,
          payload: ErrorMessage(error),
        });
      }
    };
    fetchInvestment();
  }, []);

  return (
    <main className="home-page-container">
      <Helmet>
        <title> Investments </title>
      </Helmet>
      {loading ? (
        <Loading />
      ) : error ? (
        <Message variant="danger"> {error} </Message>
      ) : (
        <section className="investment-options">
          <h1 className="title-of-home-page"> {titleData.title} </h1>
          <p className="stock-market-home-page">{titleData.paragraph}</p>
          <figure className="stock-market-elements">
            <img src={titleData.bitCoin} alt="Bitcoin" />
            <img src={titleData.etheruem} alt="Ethereum" />
            <img
              className="real-estate"
              src={titleData.realEsate}
              alt="Real Estate"
            />
            <img className="real-estate" src={titleData.money} alt="Money" />
          </figure>
        </section>
      )}

      <section className="stock-market-analysis">
        {loading ? (
          <Loading />
        ) : error ? (
          <Message variant="danger"> {error} </Message>
        ) : (
          investments.map((item, index) => {
            return (
              <section
                className="specific-environment-analysis-container"
                key={index}
              >
                <h3 className="sub-titles-of-home-page"> {item.title} </h3>
                <p className="paragraphs-environmental-analysis-home-page">
                  {item.paragraph}
                </p>
                <figure className="images-of-environmental-analysis">
                  <img src={item.image1} alt={item.alt1} />
                  <img src={item.image2} alt={item.alt2} />
                  <img src={item.image3} alt={item.alt3} />
                  <img src={item.image4} alt={item.alt4} />
                </figure>
              </section>
            );
          })
        )}
      </section>
    </main>
  );
};

export default Home;
