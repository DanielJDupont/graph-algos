import { useContext } from 'react';

import { AnimatedSquare } from '../dataTypes';
import { MatrixContext } from '../matrixContext';
import { InputMatrix } from './InputMatrix';
import { OutputMatrix } from './OutputMatrix';

import styles from './index.module.scss';

export const Matrix = () => {
  const { isDisplayingAlgorithm } = useContext(MatrixContext);

  return (
    <div className={styles.container}>
      {!isDisplayingAlgorithm ? <InputMatrix /> : <OutputMatrix />}
    </div>
  );
};
