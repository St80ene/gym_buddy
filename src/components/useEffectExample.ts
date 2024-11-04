import { useEffect } from 'react';

useEffect(() => {
  const handleScroll = () => console.log('User is scrolling!');

  window.addEventListener('scroll', handleScroll);

  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
}, []);
