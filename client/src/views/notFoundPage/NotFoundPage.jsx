import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <main className="not-found-page">
      <article className="not-found-page-container">
        <h1 className="not-found-page-title"> Page Not Found! </h1>
        <p>
          <Link to={'/'}> Go to Home Page</Link>
        </p>
      </article>
    </main>
  );
};

export default NotFoundPage;
