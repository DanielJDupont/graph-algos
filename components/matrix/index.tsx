import { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import Anime from 'react-animejs-wrapper';

import { Button } from '@material-ui/core';

import styles from './index.module.scss';

export const Matrix = () => {
  // Track the user selected start and end square by in a single variable.
  const [startSquareID, setStartSquareID] = useState('0 0');
  const [endSquareID, setEndSquareID] = useState('5 5');

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
        delay: processList.findIndex((id) => id === square.id) * 200,
      };
    })
  );

  console.log('PROCESS LIST');
  console.log(processList);

  console.log('DISPLAY MATRIX');
  console.log(displayMatrix);

  return (
    <div className={styles.container}>
      <Button onClick={() => depthFirstSearch(0, 0)}>Depth First Search</Button>
      <div className={styles.matrixContainer}>
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
    </div>
  );
};

/*
Phase 1: User Input, the user may select the start and the user may select the end.
The data structure for the matrix must be decided upon.
The last square to be selected must be selectable.
The finishing square must be selected as well.
There must be buttons to start the traversal as well.

Phase 2: Calculate the order in which all squares are visited, giving them numbers from 1 to n.
We then must have an idea of what the data structure will be, probably the same as above but with a field for tracking visited.

Phase 3: Show the traversal. 
To do this make a new matrix but with <Anime></Anime> tags for each element, with delays set to 200ms * visited.
You can simply traverse everything 1 time in O(n) time to construct the new matrix.
*/
