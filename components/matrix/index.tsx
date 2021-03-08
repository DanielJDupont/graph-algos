import { useState } from 'react';
import clsx from 'clsx';
import Anime from 'react-animejs-wrapper';

import { Button, Select, MenuItem } from '@material-ui/core';

import styles from './index.module.scss';

enum AlgorithmChoice {
  ChooseYourAlgorithm = 'ChooseYourAlgorithm',
  DepthFirstSearch = 'DepthFirstSearch',
  BreadthFirstSearch = 'BreadthFirstSearch',
}

export const Matrix = () => {
  // Track the user selected start and end square by in a single variable.
  const [isDisplayingAlgorithm, setIsDisplayingAlgorithm] = useState(false);
  const [startSquareID, setStartSquareID] = useState('0 0');
  const [endSquareID, setEndSquareID] = useState('5 5');
  const [algorithmChoice, setAlgorithmChoice] = useState<AlgorithmChoice>(
    AlgorithmChoice.ChooseYourAlgorithm
  );

  // This matrix is used for performing computations.
  const [matrix, setMatrix] = useState(
    [...Array(20)].map((_, i) =>
      [...Array(30)].map((_, j) => ({
        id: i + ' ' + j,
        isProcessed: false,
      }))
    )
  );

  const depthFirstSearch = async (i: number, j: number) => {
    // Ensure that the current grid square we are on is defined at i and j.
    if (i >= 0 && i < matrix.length) {
      if (j >= 0 && j < matrix[i].length) {
        // We have already processed this square.
        if (matrix[i][j].isProcessed) return;

        matrix[i][j].isProcessed = true;
        setProcessList((oldList) => [...oldList, matrix[i][j].id]);

        // Travel top, right, bottom, left
        depthFirstSearch(i - 1, j);
        depthFirstSearch(i, j + 1);
        depthFirstSearch(i + 1, j);
        depthFirstSearch(i, j - 1);
      }
    }
    return;
  };

  // 1D List of the order in which the square IDs were visited from first to last.
  const [processList, setProcessList] = useState([]);

  // Now recreate the matrix with each element having the correct time delay.
  const displayMatrix = matrix.map((row) =>
    row.map((square) => {
      return {
        id: square.id,
        delay: processList.findIndex((id) => id === square.id) * 50 + 200,
      };
    })
  );

  return (
    <div className={styles.container}>
      <div className={styles.buttonWrapper}>
        <div className={styles.buttonRow}>
          <Select
            value={algorithmChoice}
            onChange={(event: any) => setAlgorithmChoice(event.target.value)}
          >
            <MenuItem value={AlgorithmChoice.ChooseYourAlgorithm} disabled>
              Choose Your Algorithm
            </MenuItem>
            <MenuItem value={AlgorithmChoice.DepthFirstSearch}>
              Depth First Search
            </MenuItem>
            <MenuItem value={AlgorithmChoice.BreadthFirstSearch}>
              Breadth First Search
            </MenuItem>
          </Select>

          <Button
            className={styles.button}
            variant="contained"
            onClick={() => {
              depthFirstSearch(0, 0);
              setIsDisplayingAlgorithm(true);
            }}
          >
            Start
          </Button>
        </div>
      </div>

      {!isDisplayingAlgorithm ? (
        <div className={styles.matrixContainer}>
          {/* Input matrix */}
          {matrix.map((row, key) => (
            <div className={styles.row} key={key}>
              {row.map((square) => {
                return (
                  <div
                    className={clsx(
                      styles.normalSquare,
                      square.id === startSquareID && styles.startSquare,
                      square.id === endSquareID && styles.endSquare
                    )}
                    key={square.id}
                  >
                    {key}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.matrixContainer}>
          {/* Display Matrix */}
          {displayMatrix.map((row, key) => (
            <div className={styles.row} key={key}>
              {row.map((square) => {
                return (
                  <Anime
                    style={{
                      backgroundColor: 'lightgrey',
                      width: '35px',
                      height: '35px',
                    }}
                    config={{
                      keyframes: [
                        {
                          scale: [0.1, 0.6],
                          rotate: '+=1turn',
                          backgroundColor: '#FFF',
                          borderRadius: ['0%', '10%'],
                          easing: 'spring(1, 100, 12, 0)',
                        },
                        {
                          scale: [0.6, 0.7],
                          backgroundColor: '#ff7e7e',
                          borderRadius: ['0%', '30%'],
                          easing: 'spring(1, 100, 12, 0)',
                        },
                        {
                          scale: [0.6, 0.7],
                          backgroundColor: '#82ffac',
                          borderRadius: ['0%', '10%'],
                          easing: 'spring(1, 100, 12, 0)',
                        },
                      ],
                      duration: 1000,
                      delay: square.delay,
                    }}
                  >
                    <div className={styles.normalSquare} key={square.id}>
                      {square.delay}
                    </div>
                  </Anime>
                );
              })}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
