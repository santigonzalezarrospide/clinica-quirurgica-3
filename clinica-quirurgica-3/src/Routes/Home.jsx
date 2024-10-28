// Home.js
import React, { useRef } from 'react';
import HomeSection from '../Components/HomeSection';
import HomeBody from '../Components/HomeBody';

const Home = () => {
  const homeBodyRef = useRef(null);

  const scrollToHomeBody = () => {
    homeBodyRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main>
      <HomeSection onScrollToHomeBody={scrollToHomeBody} />
      <HomeBody ref={homeBodyRef} />
    </main>
  );
};

export default Home;
