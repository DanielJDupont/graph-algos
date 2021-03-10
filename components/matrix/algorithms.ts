import { Dispatch, SetStateAction } from 'react';

import { Square } from '../dataTypes';

export const depthFirstSearch = (
  _i: number,
  _j: number,
  matrix: Square[][],
  setProcessList: Dispatch<SetStateAction<string[]>>
) => {
  const stack: number[][] = [];
  stack.push([_i, _j]);

  while (stack.length > 0) {
    const [i, j] = stack.pop();

    // Check to ensure that the current position is on the grid and that it is not blocked or already processed.
    if (i >= 0 && i < matrix.length) {
      if (j >= 0 && j < matrix[i].length) {
        if (!matrix[i][j].isProcessed && !matrix[i][j].isBlocked) {
          // Process the square.
          matrix[i][j].isProcessed = true;
          setProcessList((oldList) => [...oldList, matrix[i][j].id]);

          // Push on left, bottom, right, top.
          // This way items are popped off in order of top, right, bottom, left.
          stack.push([i, j - 1]);
          stack.push([i + 1, j]);
          stack.push([i, j + 1]);
          stack.push([i - 1, j]);
        }
      }
    }
  }
};

export const breadthFirstSearch = (
  i: number,
  j: number,
  matrix: Square[][],
  setProcessList: Dispatch<SetStateAction<string[]>>
) => {
  const queue: number[][] = [];

  queue.push([i, j]);

  while (queue.length > 0) {
    const [_i, _j] = queue.shift();

    if (_i >= 0 && _i < matrix.length) {
      if (_j >= 0 && _j < matrix[_i].length) {
        // We have not already processed this square.
        if (!matrix[_i][_j].isProcessed) {
          matrix[_i][_j].isProcessed = true;

          setProcessList((oldList) => [...oldList, matrix[_i][_j].id]);

          // Travel top, right, bottom, left
          queue.push([_i - 1, _j]);
          queue.push([_i, _j + 1]);
          queue.push([_i + 1, _j]);
          queue.push([_i, _j - 1]);
        }
      }
    }
  }
};
