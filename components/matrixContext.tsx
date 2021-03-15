import { useState, createContext, useEffect } from 'react';

import {
  MouseMode,
  AlgorithmChoice,
  Square,
  IMatrixContext,
  SET_SQUARE,
  PLAYBACK_SPEED,
  MAZE_GENERATOR,
} from './dataTypes';

const MatrixContext = createContext<IMatrixContext>(null);

const MatrixProvider = ({ children }) => {
  // Is running the animation.
  const [isDisplayingAlgorithm, setIsDisplayingAlgorithm] = useState(false);

  // The points where the algorithm begins and ends.
  const [startSquareID, _setStartSquareID] = useState('9 9');
  const [endSquareID, _setEndSquareID] = useState('9 20');

  // The option the user has picked to either set the start, set the end, or set blockers.
  const [mouseMode, setMouseMode] = useState(MouseMode.NormalPoint);

  const [playbackSpeed, setPlaybackSpeed] = useState(PLAYBACK_SPEED['_1.00']);

  // The choice of algorithm in the algorithms.ts file in the matrix directory.
  const [algorithmChoice, setAlgorithmChoice] = useState(
    AlgorithmChoice.ChooseYourAlgorithm
  );

  const [mazeGenerator, _setMazeGenerator] = useState<MAZE_GENERATOR>(
    MAZE_GENERATOR.GENERATE_WALLS
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

  const setSquareID = (id: string, action: SET_SQUARE) => {
    // If there is already an end square here.
    if (
      id === endSquareID ||
      id === startSquareID ||
      matrix[parseInt(id.split(' ')[0])][parseInt(id.split(' ')[1])].isBlocked
    )
      return;

    if (action === SET_SQUARE.START) _setStartSquareID(id);
    if (action === SET_SQUARE.END) _setEndSquareID(id);
  };

  const setMazeGenerator = (value: MAZE_GENERATOR) => {
    // Clear
    if (value === MAZE_GENERATOR.CLEAR) {
      setMatrix(
        [...Array(20)].map((_, i) =>
          [...Array(30)].map((_, j) => ({
            id: i + ' ' + j,
            isProcessed: false,
            animated: false,
            isBlocked: false,
          }))
        )
      );
    }

    // Scatter
    if (value === MAZE_GENERATOR.SCATTER) {
      setMatrix(
        [...Array(20)].map((_, i) =>
          [...Array(30)].map((_, j) => {
            // Generator a random number between 1 and 10 inclusive.
            const randomInt = Math.floor(Math.random() * 10 + 1);

            const isWall =
              randomInt === 1 &&
              matrix[i][j].id !== startSquareID &&
              matrix[i][j].id !== endSquareID;

            return {
              id: i + ' ' + j,
              isProcessed: isWall,
              animated: false,
              isBlocked: isWall,
            };
          })
        )
      );
    }

    // Recursive Maze
    if (value === MAZE_GENERATOR.RECURSIVE_MAZE) {
      const mazedMatrix = [...Array(20)].map((_, i) =>
        [...Array(30)].map((_, j) => {
          // Do depth first search in random directions, randomly pull from this list.
          const directions = ['up', 'right', 'down', 'left'];
          const direction = directions.splice(
            Math.floor(Math.random() * directions.length),
            1
          );
          return {
            id: i + ' ' + j,
            isVisited: false,
            isWalled: false,
          };
        })
      );

      // Do not think maps will work here. need to use a function call to create frames.
      const recursiveMaze = (i, j) => {
        // Fisher-Yates (aka Knuth) Shuffle
        const shuffleArray = (array) => {
          var currentIndex = array.length,
            temporaryValue,
            randomIndex;

          // While there remain elements to shuffle...
          while (0 !== currentIndex) {
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
          }

          return array;
        };
      };
    }

    _setMazeGenerator(value);
  };

  return (
    <MatrixContext.Provider
      value={{
        // Mouse mode.
        mouseMode,
        setMouseMode,

        // Start and End squares.
        startSquareID,
        endSquareID,
        setSquareID,

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

        // Playback Speed
        playbackSpeed,
        setPlaybackSpeed,

        // Maze Generator
        mazeGenerator,
        setMazeGenerator,
      }}
    >
      {children}
    </MatrixContext.Provider>
  );
};

export { MatrixContext, MatrixProvider };
