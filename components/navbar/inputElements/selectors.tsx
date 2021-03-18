import { useContext } from 'react';

import { MatrixContext } from '../../matrixContext';
import {
  AlgorithmChoice,
  MAZE_GENERATOR,
  PLAYBACK_SPEED,
} from '../../dataTypes';

import { Select, MenuItem } from '@material-ui/core';

import styles from './selectors.module.scss';

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
