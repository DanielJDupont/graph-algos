export enum AlgorithmChoice {
  ChooseYourAlgorithm = 'ChooseYourAlgorithm',
  DepthFirstSearch = 'DepthFirstSearch',
  BreadthFirstSearch = 'BreadthFirstSearch',
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
