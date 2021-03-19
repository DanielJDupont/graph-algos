import { useState, createContext, useEffect } from 'react';
import dynamic from 'next/dynamic';

import {
  MouseMode,
  AlgorithmChoice,
  Square,
  IMatrixContext,
  SET_SQUARE,
  PLAYBACK_SPEED,
  MAZE_GENERATOR,
} from './dataTypes';
import { getWindowDimensions } from './hooks/windowDimensions';

const MatrixContext = createContext<IMatrixContext>(null);

const MatrixProvider = ({ children }) => {
  const { width, height } = getWindowDimensions();

  const [rowLength, setRowLength] = useState(
    width ? Math.floor(height / 50) : 20
  );
  const [colLength, setColLength] = useState(
    height ? Math.floor(width / 50) : 30
  );

  useEffect(() => {
    setColLength(width ? Math.floor(width / 50) : 30);
  }, [width, setColLength]);

  useEffect(() => {
    setColLength(width ? Math.floor(width / 50) : 30);
  }, []);

  useEffect(() => {
    setRowLength(height ? Math.floor(height / 50) : 30);
  }, [height, setRowLength]);

  useEffect(() => {
    setRowLength(height ? Math.floor(height / 50) : 30);
  }, []);

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
    [...Array(rowLength)].map((_, i) =>
      [...Array(colLength)].map((_, j) => ({
        id: i + ' ' + j,
        isProcessed: false,
        animated: false,
        isBlocked: false,
      }))
    )
  );

  // Regenerate the matrix every time there is a screen size change.
  useEffect(() => {
    setMatrix(
      [...Array(rowLength)].map((_, i) =>
        [...Array(colLength)].map((_, j) => ({
          id: i + ' ' + j,
          isProcessed: false,
          animated: false,
          isBlocked: false,
        }))
      )
    );
  }, [width, height]);

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
    // Clear.
    if (value === MAZE_GENERATOR.CLEAR) {
      setMatrix(
        [...Array(rowLength)].map((_, i) =>
          [...Array(colLength)].map((_, j) => ({
            id: i + ' ' + j,
            isProcessed: false,
            animated: false,
            isBlocked: false,
          }))
        )
      );
    }

    // Scatter.
    if (value === MAZE_GENERATOR.SCATTER) {
      setMatrix(
        [...Array(rowLength)].map((_, i) =>
          [...Array(colLength)].map((_, j) => {
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

    // Recursive Maze.
    if (value === MAZE_GENERATOR.RECURSIVE_MAZE) {
      // Make a maze entirely of walls.
      const wallMatrix: Square[][] = [...Array(rowLength)].map((_, i) =>
        [...Array(colLength)].map((_, j) => {
          // If the current square is the start or end then do not wall it.
          if (i + ' ' + j === startSquareID || i + ' ' + j === endSquareID)
            return {
              id: i + ' ' + j,
              isProcessed: false,
              isBlocked: false,
            };

          return {
            id: i + ' ' + j,
            isProcessed: true,
            isBlocked: true,
          };
        })
      );

      const stack: number[][] = [];
      stack.push([1, 1]);

      while (stack.length > 0) {
        const [i, j] = stack.pop();

        // Check to ensure that the current position is on the grid and within the first and last rows and columns.
        if (i >= 1 && i < wallMatrix.length - 1) {
          if (j >= 1 && j < wallMatrix[i].length - 1) {
            // Only continue if this square is a wall, and this wall does not have 2 or more paths next to it.
            if (wallMatrix[i][j].isBlocked) {
              // Get the count of paths surrounding this wall.
              const surroundingPathsCount =
                Number(wallMatrix[i - 1][j].isBlocked) +
                Number(wallMatrix[i][j + 1].isBlocked) +
                Number(wallMatrix[i + 1][j].isBlocked) +
                Number(wallMatrix[i][j - 1].isBlocked);

              // This wall has only one path touching it, we can make this wall a path to extend the maze.
              if (surroundingPathsCount <= 1) {
                // Change the square from a wall to a path.
                // Add on the ids of the 4 surrounding squares to a list if they are walls.
                // Randomly suffle the list of surrounding wall ids.
                // Append each wall id to the stack to continue the algorithm.
              }

              // // Fisher-Yates (aka Knuth) Shuffle.
              // const shuffleArray = (array) => {
              //   var currentIndex = array.length,
              //     temporaryValue,
              //     randomIndex;
              //   // While there remain elements to shuffle...
              //   while (0 !== currentIndex) {
              //     // Pick a remaining element...
              //     randomIndex = Math.floor(Math.random() * currentIndex);
              //     currentIndex -= 1;
              //     // And swap it with the current element.
              //     temporaryValue = array[currentIndex];
              //     array[currentIndex] = array[randomIndex];
              //     array[randomIndex] = temporaryValue;
              //   }
              //   return array;
              // };
              // const directions = shuffleArray([
              //   'up',
              //   'right',
              //   'bottom',
              //   'left',
              // ]);
              // directions.forEach((direction) => direction);
              // // Push on left, bottom, right, top.
              // // This way items are popped off in order of top, right, bottom, left.
              // stack.push([i, j - 1]);
              // stack.push([i + 1, j]);
              // stack.push([i, j + 1]);
              // stack.push([i - 1, j]);
            }
          }
        }
      }

      setMatrix(wallMatrix);
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

        // Screen Width and Height
        width,
        height,
      }}
    >
      {children}
    </MatrixContext.Provider>
  );
};

export { MatrixProvider as default, MatrixContext };
