import { useState, useEffect } from 'react';

/**
 * Custom hook to track mouse position and set global CSS variables
 * Also returns the current position for component-specific logic
 */
export const useMousePosition = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      setPosition({ x: clientX, y: clientY });
      
      // Update global CSS variables for mouse tracking
      const xPercent = (clientX / window.innerWidth) * 100;
      const yPercent = (clientY / window.innerHeight) * 100;
      document.documentElement.style.setProperty('--mouse-x', `${xPercent}%`);
      document.documentElement.style.setProperty('--mouse-y', `${yPercent}%`);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return position;
};
