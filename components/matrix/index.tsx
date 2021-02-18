import { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import Anime from 'rollup-practice';

import { Button } from '@material-ui/core';

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

  useEffect(() => {}, []);

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

  const displayResults = () => {
    /*
    The plan here is for our depth first search to have added some number like 100ms, 200ms, 300ms...
    As animation play delays on a library like framer motion, or a more modern one.

    So the animation library will just display the entire grid all at once and it will automatically animate everything.
    */
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

  const animatedSquaresRef = useRef(null);

  const restart = () => {
    if (animatedSquaresRef) {
      animatedSquaresRef.current.restart();
    }
  };

  return (
    <div className={styles.matrixContainer}>
      <button onClick={restart}>Reset Animation</button>
      <div className={styles.matrixTitle}>Square Grid</div>
      <Anime
        ref={animatedSquaresRef}
        animeConfig={{
          translateX: 250,
          delay: function (_, i) {
            return i * 100;
          },
          loop: true,
          direction: 'alternate',
          easing: 'easeInOutSine',
          autoplay: true,
        }}
      >
        <div className={styles.element}>1</div>
        <div className={styles.element}>2</div>
        <div className={styles.element}>3</div>
      </Anime>

      <div className={styles.buttonContainer}>
        <Button color="primary" onClick={() => depthFirstSearch(0, 0)}>
          Run Depth First Search
        </Button>
        <Button color="primary" onClick={() => resetMatrix()}>
          Reset Matrix
        </Button>
      </div>
      {processList.length}
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
