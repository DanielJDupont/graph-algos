import { useState, useContext } from 'react';
import clsx from 'clsx';
import Anime from 'react-animejs-wrapper';

import { depthFirstSearch } from './algorithms';
import { AlgorithmChoice, AnimatedSquare, MouseMode } from '../dataTypes';

import { Button, Select, MenuItem } from '@material-ui/core';

import styles from './index.module.scss';
import { MatrixContext } from '../matrixContext';

export const Matrix = () => {
  const {
    // Start square.
    startSquareID,
    setStartSquareID,

    // End square.
    endSquareID,
    setEndSquareID,

    // Show the animation.
    isDisplayingAlgorithm,
    setIsDisplayingAlgorithm,

    // Mode of the mouse.
    mouseMode,
    setMouseMode,

    // Process list.
    processList,
    setProcessList,

    // Matrix.
    matrix,
    setMatrix,
  } = useContext(MatrixContext);

  // Track the user selected start and end square by in a single variable.
  const [algorithmChoice, setAlgorithmChoice] = useState<AlgorithmChoice>(
    AlgorithmChoice.ChooseYourAlgorithm
  );

  // Delete all squares that occur after the end square.
  const filteredProcessList = processList.slice(
    0,
    processList.findIndex((squareID) => endSquareID === squareID)
  );

  // Now recreate the matrix with each element having the correct time delay.
  const displayMatrix: AnimatedSquare[][] = matrix.map((row) =>
    row.map((square) => {
      return {
        id: square.id,
        animated:
          filteredProcessList.findIndex((id) => id === square.id) * 50 >= 0,
        isBlocked: square.isBlocked,
        isProcessed: square.isProcessed,
        delay: filteredProcessList.findIndex((id) => id === square.id) * 50,
      };
    })
  );

  return (
    <div className={styles.container}>
      {!isDisplayingAlgorithm ? (
        <div className={styles.matrixContainer}>
          {/* Input Matrix */}
          {matrix.map((row, rowIndex) => (
            <div className={styles.row} key={rowIndex}>
              {row.map((square) => {
                return (
                  <div
                    className={clsx(
                      styles.normalSquare,
                      square.id === startSquareID && styles.startSquare,
                      square.id === endSquareID && styles.endSquare
                    )}
                    onMouseDown={() => {
                      // Click to set the start square only if start square button is set.
                      if (mouseMode === MouseMode.StartingPoint) {
                        setStartSquareID(square.id);
                      }

                      // Click to set the end square only if the ending point button is clicked.
                      else if (mouseMode === MouseMode.EndingPoint) {
                        setEndSquareID(square.id);
                      }

                      // Click to remove individual dark grey squares.
                      else {
                        setMatrix(
                          matrix.map((row) =>
                            row.map((_square) => {
                              if (_square.id === square.id) {
                                return {
                                  id: _square.id,
                                  isProcessed: !square.isProcessed,
                                  isBlocked: !square.isBlocked,
                                };
                              } else return _square;
                            })
                          )
                        );
                      }
                    }}
                    onMouseEnter={(mouseEvent) => {
                      // If the user is entering the square while holding down the left mouse button.
                      if (mouseEvent.buttons === 1) {
                        if (mouseMode === MouseMode.EndingPoint) {
                          setEndSquareID(square.id);
                        } else if (mouseMode === MouseMode.StartingPoint) {
                          setStartSquareID(square.id);
                        } else {
                          setMatrix(
                            matrix.map((row) =>
                              row.map((_square) => {
                                if (_square.id === square.id) {
                                  return {
                                    id: _square.id,
                                    isProcessed: !square.isProcessed,
                                    isBlocked: !square.isBlocked,
                                  };
                                } else return _square;
                              })
                            )
                          );
                        }
                      }
                    }}
                    key={square.id}
                  >
                    {square.isProcessed && (
                      <div className={styles.greySquare} />
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.matrixContainer}>
          {/* Display Matrix with Animation */}
          {displayMatrix.map((row, key) => (
            <div className={styles.row} key={key}>
              {row.map((square) => {
                if (square.animated && square.id !== startSquareID) {
                  return (
                    <Anime
                      style={{
                        width: '35px',
                        height: '35px',
                      }}
                      config={{
                        keyframes: [
                          {},
                          {
                            scale: [0, 1],
                            backgroundColor: ['#36456d', '#6c88d6'],
                            borderRadius: ['40%', '0%'],
                            easing: 'spring(1, 30, 10, 0)',
                          },

                          {
                            backgroundColor: ['#6c88d6', '#5161f3'],
                            easing: 'spring(1, 30, 10, 0)',
                          },
                        ],
                        delay: square.delay,
                      }}
                    >
                      <div className={styles.normalSquare} key={square.id} />
                    </Anime>
                  );
                } else if (square.isBlocked) {
                  return <div className={styles.blockedSquare} />;
                } else if (square.id === endSquareID) {
                  return <div className={styles.endSquare} />;
                } else if (square.id === startSquareID) {
                  return <div className={styles.startSquare} />;
                } else {
                  return <div className={styles.normalSquare} />;
                }
              })}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
