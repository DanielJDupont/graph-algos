import { useState, createContext } from 'react';

const MatrixContext = createContext(null);

const MatrixProvider = ({ children }) => {
  const [mouseMode, setMouseMode] = useState();

  return (
    <MatrixContext.Provider value={{ mouseMode, setMouseMode }}>
      {children}
    </MatrixContext.Provider>
  );
};

export { MatrixContext, MatrixProvider };
