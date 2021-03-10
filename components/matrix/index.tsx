import { useState, useContext } from 'react';
import clsx from 'clsx';
import Anime from 'react-animejs-wrapper';

import { depthFirstSearch } from './algorithms';
import { AlgorithmChoice, AnimatedSquare, MouseMode } from '../dataTypes';

import { Button, Select, MenuItem } from '@material-ui/core';

import styles from './index.module.scss';
import { MatrixContext } from '../matrixContext';
import { InputMatrix } from './InputMatrix';
import { OutputMatrix } from './OutputMatrix';

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
      {!isDisplayingAlgorithm ? <InputMatrix /> : <OutputMatrix />}
    </div>
  );
};
