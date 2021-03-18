import { Dispatch, SetStateAction } from 'react';

export enum AlgorithmChoice {
  ChooseYourAlgorithm,
  DepthFirstSearch,
  BreadthFirstSearch,
}

export enum MouseMode {
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

export interface IMatrixContext {
  // Mouse mode.
  mouseMode: MouseMode;
  setMouseMode: Dispatch<SetStateAction<MouseMode>>;

  // Start and End squares.
  startSquareID: string;
  endSquareID: string;
  setSquareID: (id: string, action: SET_SQUARE) => void;

  // Display the animation.
  isDisplayingAlgorithm: boolean;
  setIsDisplayingAlgorithm: Dispatch<SetStateAction<boolean>>;

  // Algorithm choice.
  algorithmChoice: AlgorithmChoice;
  setAlgorithmChoice: Dispatch<SetStateAction<AlgorithmChoice>>;

  // Matrix.
  matrix: Square[][];
  setMatrix: Dispatch<SetStateAction<Square[][]>>;

  // Process list.
  processList: string[];
  setProcessList: Dispatch<SetStateAction<string[]>>;

  // Playback speed.
  playbackSpeed: PLAYBACK_SPEED;
  setPlaybackSpeed: Dispatch<SetStateAction<PLAYBACK_SPEED>>;

  mazeGenerator: MAZE_GENERATOR;
  setMazeGenerator: Dispatch<SetStateAction<MAZE_GENERATOR>>;

  width: number;
  height: number;
}

// Actions for setting the id of the start and end squares.
export enum SET_SQUARE {
  START,
  END,
}

export enum PLAYBACK_SPEED {
  '_0.25' = 0.25,
  '_0.50' = 0.5,
  '_0.75' = 0.75,
  '_1.00' = 1.0,
  '_1.25' = 1.25,
  '_1.50' = 1.5,
  '_1.75' = 1.75,
  '_2.00' = 2.0,
}

export enum MAZE_GENERATOR {
  GENERATE_WALLS,
  CLEAR,
  RECURSIVE_MAZE,
  SCATTER,
}
