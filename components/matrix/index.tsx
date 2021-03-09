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

enum MouseMode {
  // Can click and drag to set the starting position.
  StartingPoint,
  // Can click and drag to set the ending position.
  EndingPoint,
  // Can click and drag to create walls, or if the element is already a wall, remove the wall.
  NormalPoint,
}

export interface Square {
  id: string;
  isProcessed: boolean;
  isBlocked: boolean;
}

export interface AnimatedSquare {
  id: string;
  isProcessed: boolean;
  animated: boolean;
  isBlocked: boolean;
  delay: number;
}

export const Matrix = () => {
  // Track the user selected start and end square by in a single variable.
  const [isDisplayingAlgorithm, setIsDisplayingAlgorithm] = useState(false);
  const [startSquareID, setStartSquareID] = useState('0 0');
  const [endSquareID, setEndSquareID] = useState('5 5');

  const [mouseMode, setMouseMode] = useState<MouseMode>(MouseMode.NormalPoint);
  const [algorithmChoice, setAlgorithmChoice] = useState<AlgorithmChoice>(
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

  const depthFirstSearch = async (i: number, j: number) => {
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
      <div className={styles.buttonWrapper}>
        <div className={styles.buttonRow}>
          {startSquareID}
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
            className={clsx(
              styles.button,
              mouseMode === MouseMode.StartingPoint && styles.buttonActive
            )}
            variant="contained"
            onClick={() => {
              if (mouseMode !== MouseMode.StartingPoint) {
                setMouseMode(MouseMode.StartingPoint);
              } else if (mouseMode === MouseMode.StartingPoint) {
                setMouseMode(MouseMode.NormalPoint);
              }
            }}
          >
            Starting Point
          </Button>

          <Button
            className={clsx(
              styles.button,
              mouseMode === MouseMode.EndingPoint && styles.buttonActive
            )}
            variant="contained"
            onClick={() => {
              if (mouseMode !== MouseMode.EndingPoint) {
                setMouseMode(MouseMode.EndingPoint);
              } else if (mouseMode === MouseMode.EndingPoint) {
                setMouseMode(MouseMode.NormalPoint);
              }
            }}
          >
            Ending Point
          </Button>

          <Button
            className={styles.button}
            style={{ marginLeft: '20px' }}
            variant="contained"
            onClick={() => {
              depthFirstSearch(
                parseInt(startSquareID.split(' ')[0]),
                parseInt(startSquareID.split(' ')[1])
              );
              setIsDisplayingAlgorithm(true);
            }}
          >
            Start Animation
          </Button>
        </div>
      </div>

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
