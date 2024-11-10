// Home.js
import React, { useRef } from 'react';
import HomeSection from '../Components/HomeSection';
import HomeBody from '../Components/HomeBody';
import Carousel from '../Components/Carousel';

const Home = () => {
  const homeBodyRef = useRef(null);

  const scrollToHomeBody = () => {
    const navbarHeight = document.querySelector('nav').offsetHeight;
    window.scrollTo({
      top: homeBodyRef.current.offsetTop - navbarHeight,
      behavior: 'smooth',
    });
  };

  return (
    <main>
      <HomeSection onScrollToHomeBody={scrollToHomeBody} />
      <div id="mission-section" ref={homeBodyRef}>
        <HomeBody />
      </div>
      
      <Carousel />
    </main>
  );
};

export default Home;
