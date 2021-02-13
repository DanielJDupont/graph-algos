import { useEffect, useState } from 'react';
import clsx from 'clsx';

import { Square } from './index.dataTypes';
import { useMediaQuery } from './index.hooks';
import styles from './index.module.scss';

export const Matrix = () => {
  const [processList, setProcessList] = useState([]);
  const [matrix, setMatrix] = useState(
    [...Array(20)].map((_, i) =>
      [...Array(30)].map((_, j) => ({
        id: i + ' ' + j,
        isProcessed: false,
        isDisplayed: false,
      }))
    )
  );

  const resetMatrix = () => {
    setProcessList([]);
    setMatrix(
      [...Array(20)].map((_, i) =>
        [...Array(30)].map((_, j) => ({
          id: i + ' ' + j,
          isProcessed: false,
          isDisplayed: false,
        }))
      )
    );
  };

  const depthFirstSearch = async (i: number, j: number) => {
    // Ensure that the current grid square we are on is defined at i and j.
    if (i >= 0 && i < matrix.length) {
      if (j >= 0 && j < matrix[i].length) {
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

  return (
    <div className={styles.matrixContainer}>
      <div className={styles.matrixTitle}>Square Grid</div>

      <div className={styles.buttonContainer}>
        <button onClick={() => depthFirstSearch(0, 0)}>
          Run Depth First Search
        </button>
        <button onClick={() => resetMatrix()}>Reset Matrix</button>
      </div>

      {processList.length}

      {/* {processList.map((id) => (
        <div>{id}</div>
      ))} */}

      {/* A grid that holds all of the squares. */}
      <div className={styles.squareContainer}>
        {matrix.map((row) => (
          <div className={styles.row}>
            {row.map((square) => (
              <div
                key={square.id}
                className={clsx(
                  styles.unprocessedSquare,
                  square.isProcessed && styles.processedSquare
                )}
              >
                {square.id}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
