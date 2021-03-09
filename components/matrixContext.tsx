import { useState, createContext } from 'react';

import { MouseMode, AlgorithmChoice } from './dataTypes';

const MatrixContext = createContext(null);

const MatrixProvider = ({ children }) => {
  // Is running the animation.
  const [isDisplayingAlgorithm, setIsDisplayingAlgorithm] = useState(false);

  // The points where the algorithm begins and ends.
  const [startSquareID, setStartSquareID] = useState('0 0');
  const [endSquareID, setEndSquareID] = useState('5 5');

  // The option the user has picked to either set the start, set the end, or set blockers.
  const [mouseMode, setMouseMode] = useState(MouseMode.NormalPoint);

  // The choice of algorithm in the algorithms.ts file in the matrix directory.
  const [algorithmChoice, setAlgorithmChoice] = useState(
    AlgorithmChoice.ChooseYourAlgorithm
  );

  return (
    <MatrixContext.Provider value={{ mouseMode, setMouseMode }}>
      {children}
    </MatrixContext.Provider>
  );
};

export { MatrixContext, MatrixProvider };
