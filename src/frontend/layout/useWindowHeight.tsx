import { createContext, FC, useContext, useEffect, useState } from 'react';

const useWindowHeight = () => useContext(useWindowHeight.context);
useWindowHeight.context = createContext(0);

export const WindwoHeightProvider: FC = ({ children }) => {
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  useEffect(() => {
    const resizeEvent = () => {
      setWindowHeight(window.innerHeight);
    };
    document.title = 'Login Success';
    window.addEventListener('resize', resizeEvent);
    return () => {
      window.removeEventListener('resize', resizeEvent);
    };
  }, []);

  return (
    <useWindowHeight.context.Provider value={windowHeight}>
      {children}
    </useWindowHeight.context.Provider>
  );
};

export default useWindowHeight;
