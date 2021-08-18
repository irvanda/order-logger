import React from 'react';
import './index.css';

const Home = () => {
  React.useEffect(() => {
    setTimeout(() => {
      window.location.href = '/';
    }, 2000);
  }, []);
  return (
    <div className="container">
      <div>Error 404</div>
      <div>Page Not Found</div>
      <div>redirecting to home page ...</div>
    </div>
  );
};

export default Home;
