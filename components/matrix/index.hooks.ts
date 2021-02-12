import { useState, useEffect } from 'react';

const getWindowDimensions = () => {
  // Check to ensure that code is being run client side and not server side. Window is undefined server side.
  if (typeof window === 'undefined')
    return {
      width: 0,
      height: 0,
    };

  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
};

export const useWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
};
