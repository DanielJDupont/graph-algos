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
  setSquareID: (id: string, action: SET_SQUARE) => void

  // Display the animation.
  isDisplayingAlgorithm: boolean;
  setIsDisplayingAlgorithm: Dispatch<SetStateAction<boolean>>;

  // Algorithm choice.
  algorithmChoice: AlgorithmChoice;
  setAlgorithmChoice: Dispatch<SetStateAction<AlgorithmChoice>>;

  // Matrix
  matrix: Square[][];
  setMatrix: Dispatch<SetStateAction<Square[][]>>;

  // Process list.
  processList: string[];
  setProcessList: Dispatch<SetStateAction<string[]>>;
}


// Actions for setting the id of the start and end squares.
export enum SET_SQUARE {
  START,
  END,
}