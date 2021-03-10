import { useState, createContext } from 'react';

import {
  MouseMode,
  AlgorithmChoice,
  Square,
  IMatrixContext,
} from './dataTypes';

const MatrixContext = createContext<IMatrixContext>(null);

const MatrixProvider = ({ children }) => {
  // Is running the animation.
  const [isDisplayingAlgorithm, setIsDisplayingAlgorithm] = useState(false);

  // The points where the algorithm begins and ends.
  const [startSquareID, setStartSquareID] = useState('9 9');
  const [endSquareID, setEndSquareID] = useState('9 20');

  // The option the user has picked to either set the start, set the end, or set blockers.
  const [mouseMode, setMouseMode] = useState(MouseMode.NormalPoint);

  // The choice of algorithm in the algorithms.ts file in the matrix directory.
  const [algorithmChoice, setAlgorithmChoice] = useState(
    AlgorithmChoice.ChooseYourAlgorithm
  );

  // This matrix is used for performing computations.
  const [matrix, setMatrix] = useState<Square[][]>(
    [...Array(20)].map((_, i) =>
      [...Array(30)].map((_, j) => ({
        id: i + ' ' + j,
        isProcessed: false,
        animated: false,
        isBlocked: false,
      }))
    )
  );

  // 1D List of the order in which the square IDs were visited from first to last.
  const [processList, setProcessList] = useState<string[]>([]);

  return (
    <MatrixContext.Provider
      value={{
        // Mouse mode.
        mouseMode,
        setMouseMode,

        // Start square.
        startSquareID,
        setStartSquareID,

        // End square.
        endSquareID,
        setEndSquareID,

        // Display the animation.
        isDisplayingAlgorithm,
        setIsDisplayingAlgorithm,

        // Algorithm choice.
        algorithmChoice,
        setAlgorithmChoice,

        // Matrix
        matrix,
        setMatrix,

        // Process list.
        processList,
        setProcessList,
      }}
    >
      {children}
    </MatrixContext.Provider>
  );
};

export { MatrixContext, MatrixProvider };
