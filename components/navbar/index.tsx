import { useContext, useState } from 'react';
import clsx from 'clsx';

import {
  AlgorithmChoice,
  MAZE_GENERATOR,
  MouseMode,
  PLAYBACK_SPEED,
} from '../dataTypes';
import { depthFirstSearch, breadthFirstSearch } from '../matrix/algorithms';
import { MatrixContext } from '../matrixContext';
import { useWindowSize } from '../hooks/windowSize';
import { StartAnimationButton } from './buttons';

import { Button, MenuItem, Select, Tooltip, Menu } from '@material-ui/core';
import {
  PlayCircleOutline,
  FlagOutlined,
  DirectionsRunOutlined,
  ReplayOutlined,
  GitHub,
} from '@material-ui/icons';

import styles from './index.module.scss';

export const Navbar: React.FC = () => {
  const {
    mouseMode,
    setMouseMode,
    startSquareID,
    isDisplayingAlgorithm,
    setIsDisplayingAlgorithm,
    algorithmChoice,
    setAlgorithmChoice,
    matrix,
    setMatrix,
    setProcessList,
    playbackSpeed,
    setPlaybackSpeed,
    mazeGenerator,
    setMazeGenerator,
  } = useContext(MatrixContext);

  const { width } = useWindowSize();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={styles.navbarContainer}>
      <div className={styles.navbarTitle}>Graph Algos</div>
      {width >= 1220 ? (
        <div className={styles.controlsContainer}>
          <Tooltip
            title="Set the starting point of the algorithm!"
            enterDelay={300}
          >
            <Button
              className={clsx(
                styles.button,
                mouseMode === MouseMode.StartingPoint && styles.buttonActive
              )}
              disabled={isDisplayingAlgorithm}
              variant="contained"
              onClick={() => {
                if (mouseMode !== MouseMode.StartingPoint) {
                  setMouseMode(MouseMode.StartingPoint);
                } else if (mouseMode === MouseMode.StartingPoint) {
                  setMouseMode(MouseMode.NormalPoint);
                }
              }}
            >
              <DirectionsRunOutlined className={styles.icon} />
              Starting Point
            </Button>
          </Tooltip>

          <Tooltip
            title="Click to set a square where the algorithm will end!"
            enterDelay={300}
          >
            <Button
              className={clsx(
                styles.button,
                mouseMode === MouseMode.EndingPoint && styles.buttonActive
              )}
              disabled={isDisplayingAlgorithm}
              variant="contained"
              onClick={() => {
                if (mouseMode !== MouseMode.EndingPoint) {
                  setMouseMode(MouseMode.EndingPoint);
                } else if (mouseMode === MouseMode.EndingPoint) {
                  setMouseMode(MouseMode.NormalPoint);
                }
              }}
            >
              <FlagOutlined className={styles.icon} />
              Ending Point
            </Button>
          </Tooltip>

          <Select
            className={styles.selector}
            value={mazeGenerator}
            disabled={isDisplayingAlgorithm}
            onChange={(event: any) => {
              setMazeGenerator(event.target.value);
            }}
          >
            <MenuItem value={MAZE_GENERATOR.GENERATE_WALLS} disabled>
              Generate Walls
            </MenuItem>

            <MenuItem value={MAZE_GENERATOR.CLEAR}>Clear</MenuItem>

            <MenuItem value={MAZE_GENERATOR.RECURSIVE_MAZE}>
              Recursive Maze
            </MenuItem>

            <MenuItem value={MAZE_GENERATOR.SCATTER}>Scatter</MenuItem>
          </Select>

          <Select
            className={styles.selector}
            value={algorithmChoice}
            disabled={isDisplayingAlgorithm}
            onChange={(event: any) => {
              setAlgorithmChoice(event.target.value);
            }}
          >
            <MenuItem value={AlgorithmChoice.ChooseYourAlgorithm} disabled>
              Select Algorithm
            </MenuItem>

            <MenuItem value={AlgorithmChoice.DepthFirstSearch}>
              Depth First Search
            </MenuItem>

            <MenuItem value={AlgorithmChoice.BreadthFirstSearch}>
              Breadth First Search
            </MenuItem>
          </Select>

          <Select
            className={styles.playbackSelector}
            value={playbackSpeed}
            disabled={isDisplayingAlgorithm}
            onChange={(event: any) => {
              setPlaybackSpeed(event.target.value);
            }}
          >
            <MenuItem disabled>Playback Speed</MenuItem>
            <MenuItem value={PLAYBACK_SPEED['_0.25']}>0.25</MenuItem>
            <MenuItem value={PLAYBACK_SPEED['_0.50']}>0.5</MenuItem>
            <MenuItem value={PLAYBACK_SPEED['_0.75']}>0.75</MenuItem>
            <MenuItem value={PLAYBACK_SPEED['_1.00']}>1.0</MenuItem>
            <MenuItem value={PLAYBACK_SPEED['_1.25']}>1.25</MenuItem>
            <MenuItem value={PLAYBACK_SPEED['_1.50']}>1.50</MenuItem>
            <MenuItem value={PLAYBACK_SPEED['_1.75']}>1.75</MenuItem>
            <MenuItem value={PLAYBACK_SPEED['_2.00']}>2.0</MenuItem>
          </Select>

          {!isDisplayingAlgorithm && (
            <Button
              className={styles.button}
              variant="contained"
              disabled={
                algorithmChoice === AlgorithmChoice.ChooseYourAlgorithm ||
                isDisplayingAlgorithm
              }
              onClick={() => {
                if (algorithmChoice === AlgorithmChoice.BreadthFirstSearch) {
                  breadthFirstSearch(startSquareID, matrix, setProcessList);
                } else if (
                  algorithmChoice === AlgorithmChoice.DepthFirstSearch
                ) {
                  depthFirstSearch(startSquareID, matrix, setProcessList);
                }

                setIsDisplayingAlgorithm(true);
              }}
            >
              <PlayCircleOutline className={styles.icon} />
              Start Animation
            </Button>
          )}

          {isDisplayingAlgorithm && (
            <Button
              className={clsx(styles.button)}
              disabled={!isDisplayingAlgorithm}
              variant="contained"
              onClick={() => {
                // Wipe out the matrix so nothing is processed anymore.
                setMatrix(
                  matrix.map((row) =>
                    row.map((square) => {
                      if (!square.isBlocked) {
                        return { ...square, isProcessed: false };
                      } else {
                        // Squares that are blocked must also be marked as having been processed.
                        return {
                          ...square,
                          isProcessed: true,
                          isBlocked: true,
                        };
                      }
                    })
                  )
                );
                setIsDisplayingAlgorithm(false);
                setProcessList([]);
              }}
            >
              <ReplayOutlined className={styles.icon} />
              Reset
            </Button>
          )}
        </div>
      ) : (
        <>
          <Button
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleClick}
          >
            View Controls
          </Button>
          <Menu
            id="controlsMenu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>
              <Button
                className={clsx(
                  styles.button,
                  mouseMode === MouseMode.StartingPoint && styles.buttonActive
                )}
                disabled={isDisplayingAlgorithm}
                variant="contained"
                onClick={() => {
                  if (mouseMode !== MouseMode.StartingPoint) {
                    setMouseMode(MouseMode.StartingPoint);
                  } else if (mouseMode === MouseMode.StartingPoint) {
                    setMouseMode(MouseMode.NormalPoint);
                  }
                }}
              >
                <DirectionsRunOutlined className={styles.icon} />
                Starting Point
              </Button>
            </MenuItem>

            <MenuItem onClick={handleClose}>
              <Button
                className={clsx(
                  styles.button,
                  mouseMode === MouseMode.EndingPoint && styles.buttonActive
                )}
                disabled={isDisplayingAlgorithm}
                variant="contained"
                onClick={() => {
                  if (mouseMode !== MouseMode.EndingPoint) {
                    setMouseMode(MouseMode.EndingPoint);
                  } else if (mouseMode === MouseMode.EndingPoint) {
                    setMouseMode(MouseMode.NormalPoint);
                  }
                }}
              >
                <FlagOutlined className={styles.icon} />
                Ending Point
              </Button>
            </MenuItem>

            <MenuItem onClick={handleClose}>
              <Select
                className={styles.selector}
                value={mazeGenerator}
                disabled={isDisplayingAlgorithm}
                onChange={(event: any) => {
                  setMazeGenerator(event.target.value);
                }}
              >
                <MenuItem value={MAZE_GENERATOR.GENERATE_WALLS} disabled>
                  Generate Walls
                </MenuItem>

                <MenuItem value={MAZE_GENERATOR.CLEAR}>Clear</MenuItem>

                <MenuItem value={MAZE_GENERATOR.RECURSIVE_MAZE}>
                  Recursive Maze
                </MenuItem>

                <MenuItem value={MAZE_GENERATOR.SCATTER}>Scatter</MenuItem>
              </Select>
            </MenuItem>

            <MenuItem onClick={handleClose}>
              <Select
                className={styles.selector}
                value={algorithmChoice}
                disabled={isDisplayingAlgorithm}
                onChange={(event: any) => {
                  setAlgorithmChoice(event.target.value);
                }}
              >
                <MenuItem value={AlgorithmChoice.ChooseYourAlgorithm} disabled>
                  Select Algorithm
                </MenuItem>

                <MenuItem value={AlgorithmChoice.DepthFirstSearch}>
                  Depth First Search
                </MenuItem>

                <MenuItem value={AlgorithmChoice.BreadthFirstSearch}>
                  Breadth First Search
                </MenuItem>
              </Select>
            </MenuItem>

            <MenuItem onClick={handleClose}>
              <Select
                className={styles.playbackSelector}
                value={playbackSpeed}
                disabled={isDisplayingAlgorithm}
                onChange={(event: any) => {
                  setPlaybackSpeed(event.target.value);
                }}
              >
                <MenuItem disabled>Playback Speed</MenuItem>
                <MenuItem value={PLAYBACK_SPEED['_0.25']}>0.25</MenuItem>
                <MenuItem value={PLAYBACK_SPEED['_0.50']}>0.5</MenuItem>
                <MenuItem value={PLAYBACK_SPEED['_0.75']}>0.75</MenuItem>
                <MenuItem value={PLAYBACK_SPEED['_1.00']}>1.0</MenuItem>
                <MenuItem value={PLAYBACK_SPEED['_1.25']}>1.25</MenuItem>
                <MenuItem value={PLAYBACK_SPEED['_1.50']}>1.50</MenuItem>
                <MenuItem value={PLAYBACK_SPEED['_1.75']}>1.75</MenuItem>
                <MenuItem value={PLAYBACK_SPEED['_2.00']}>2.0</MenuItem>
              </Select>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              {!isDisplayingAlgorithm && <StartAnimationButton />}
              {isDisplayingAlgorithm && (
                <Button
                  className={clsx(styles.button)}
                  disabled={!isDisplayingAlgorithm}
                  variant="contained"
                  onClick={() => {
                    // Wipe out the matrix so nothing is processed anymore.
                    setMatrix(
                      matrix.map((row) =>
                        row.map((square) => {
                          if (!square.isBlocked) {
                            return { ...square, isProcessed: false };
                          } else {
                            // Squares that are blocked must also be marked as having been processed.
                            return {
                              ...square,
                              isProcessed: true,
                              isBlocked: true,
                            };
                          }
                        })
                      )
                    );
                    setIsDisplayingAlgorithm(false);
                    setProcessList([]);
                  }}
                >
                  <ReplayOutlined className={styles.icon} />
                  Reset
                </Button>
              )}
            </MenuItem>
          </Menu>
        </>
      )}

      <a href="https://github.com/DanielJDupont/graph-algos" target="_blank">
        <div className={styles.github}>
          <GitHub className={styles.githubIcon} />
          <div>View On Github</div>
        </div>
      </a>
    </div>
  );
};
