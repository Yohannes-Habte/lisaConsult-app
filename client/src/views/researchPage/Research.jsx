import React, { useEffect } from 'react';
import './Research.scss';
import axios from 'axios';
import { useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import Loading from '../../components/utiles/Loading';
import Message from '../../components/utiles/MessageBox';
import ErrorMessage from '../../components/utiles/ErrorMessage';
import { PagesContext } from '../../context/pagesData/PagesProvider';
import { RESEARCH_ACTION } from '../../context/pagesData/Reducer';

const Research = () => {
  // Global state variables
  const { researches, loading, error, dispatch } = useContext(PagesContext);

  // display research page data in the frontend using useEffect hook
  useEffect(() => {
    const fetchResearchData = async () => {
      dispatch({ try: RESEARCH_ACTION.FETCH_RESEARCH_REQUEST });
      try {
        const { data } = await axios.get(
          process.env.REACT_APP_SERVER_URL + `/api/pages/researches`
        );
        dispatch({
          type: RESEARCH_ACTION.FETCH_RESEARCH_SUCCESS,
          payload: data,
        });
      } catch (error) {
        console.log(error);
        dispatch({
          type: RESEARCH_ACTION.FETCH_RESEARCH_FAIL,
          payload: ErrorMessage(error),
        });
      }
    };
    fetchResearchData();
  }, []);

  return (
    <main className="researchPage">
      <Helmet>
        <title> Researches </title>
      </Helmet>
      <section className="research-container">
        <h1 className="research-title"> Interdisciplinary Research </h1>
        {loading ? (
          <Loading />
        ) : error ? (
          <Message variant="danger"> {error} </Message>
        ) : (
          <div className="research-items-container">
            {researches.map((research, index) => {
              return (
                <article key={index} className="research-items">
                  <figure className="image-container">
                    <img src={research.image} alt={research.alt} />
                  </figure>
                  <h2 className="research-article-title">{research.heading}</h2>
                  <p className="research-paragraph"> {research.paragraph} </p>
                  <ol className="research-ordered-list">
                    <li>
                      <a
                        href="https://redfame.com/journal/index.php/afa/article/view/2723/2874"
                        target="_blank"
                      >
                        {research.articles.article1}
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://ideas.repec.org/a/rfa/afajnl/v2y2016i2p30-45.html"
                        target="_blank"
                      >
                        {research.articles.article2}
                      </a>
                    </li>
                    <li>
                      <a
                        href="http://ir.mksu.ac.ke/handle/123456780/4835"
                        target="_blank"
                      >
                        {research.articles.article3}
                      </a>
                    </li>
                  </ol>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
};

export default Research;
