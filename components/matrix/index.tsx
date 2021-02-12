import { useState } from 'react';
import clsx from 'clsx';

import { Square } from './index.dataTypes';
import { useMediaQuery } from './index.hooks';
import styles from './index.module.scss';

export const Matrix = () => {
  const [matrix, setMatrix] = useState(
    [...Array(30)].map((_, i) =>
      [...Array(20)].map((_, j) => ({
        id: i + ' ' + j,
        isProcessed: false,
      }))
    )
  );

  const resetMatrix = () => {
    setMatrix(
      [...Array(30)].map((_, i) =>
        [...Array(20)].map((_, j) => ({
          id: i + ' ' + j,
          isProcessed: false,
        }))
      )
    );
  };

  const depthFirstSearch = async (i: number, j: number) => {
    console.log('running');
    // Delay so it appears to animate for the user.
    await setTimeout(() => {}, 100);

    // Ensure that the current grid square we are on is defined at i and j.
    if (i >= 0 && i < matrix.length) {
      if (j >= 0 && j < matrix[i].length) {
        if (matrix[i][j].isProcessed) return;
        matrix[i][j].isProcessed = true;

        setMatrix(
          matrix.map((row, _i) =>
            row.map((square, _j) => {
              if (i === _i && j === _j) square.isProcessed = true;
              return square;
            })
          )
        );

        await setTimeout(() => {
          depthFirstSearch(i, j + 1);
          depthFirstSearch(i + 1, j);
          depthFirstSearch(i, j - 1);
          depthFirstSearch(i - 1, j);
        }, 100);
        // Travel top, right, bottom, left
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
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
