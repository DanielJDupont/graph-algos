import { useContext } from 'react';
import clsx from 'clsx';

import { MatrixContext } from '../../matrixContext';
import { breadthFirstSearch, depthFirstSearch } from '../../matrix/algorithms';
import {
  AlgorithmChoice,
  MAZE_GENERATOR,
  MouseMode,
  PLAYBACK_SPEED,
} from '../../dataTypes';

import { Tooltip, Button, Select, MenuItem } from '@material-ui/core';
import {
  DirectionsRunOutlined,
  FlagOutlined,
  PlayCircleOutline,
  ReplayOutlined,
} from '@material-ui/icons';

import styles from './inputElements.module.scss';

export const StartingPointButton: React.FC = () => {
  const { mouseMode, setMouseMode, isDisplayingAlgorithm } = useContext(
    MatrixContext
  );

  return (
    <Tooltip title="Set the starting point of the algorithm!" enterDelay={300}>
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
  );
};

export const EndingPointButton: React.FC = () => {
  const { mouseMode, setMouseMode, isDisplayingAlgorithm } = useContext(
    MatrixContext
  );

  return (
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
  );
};

export const StartAnimationButton: React.FC = () => {
  const {
    algorithmChoice,
    isDisplayingAlgorithm,
    setIsDisplayingAlgorithm,
    startSquareID,
    matrix,
    setProcessList,
  } = useContext(MatrixContext);

  return (
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
        } else if (algorithmChoice === AlgorithmChoice.DepthFirstSearch) {
          depthFirstSearch(startSquareID, matrix, setProcessList);
        }

        setIsDisplayingAlgorithm(true);
      }}
    >
      <PlayCircleOutline className={styles.icon} />
      Start Animation
    </Button>
  );
};

// Allows the user to clear all walls, generate a maze, generate random walls.
export const MazeGeneratorSelector: React.FC = () => {
  const { mazeGenerator, setMazeGenerator, isDisplayingAlgorithm } = useContext(
    MatrixContext
  );

  return (
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

      <MenuItem value={MAZE_GENERATOR.RECURSIVE_MAZE}>Recursive Maze</MenuItem>

      <MenuItem value={MAZE_GENERATOR.SCATTER}>Scatter</MenuItem>
    </Select>
  );
};

export const AlgorithmSelector: React.FC = () => {
  const {
    algorithmChoice,
    setAlgorithmChoice,
    isDisplayingAlgorithm,
  } = useContext(MatrixContext);

  return (
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
  );
};

export const PlaybackSpeedSelector: React.FC = () => {
  const { playbackSpeed, setPlaybackSpeed, isDisplayingAlgorithm } = useContext(
    MatrixContext
  );

  return (
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
  );
};

export const ResetButton: React.FC = () => {
  const {
    setIsDisplayingAlgorithm,
    setMatrix,
    isDisplayingAlgorithm,
    setProcessList,
    matrix,
  } = useContext(MatrixContext);

  return (
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
  );
};
