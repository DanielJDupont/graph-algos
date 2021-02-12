import { useEffect } from 'react';
import { useMediaQuery } from './index.hooks';

import styles from './index.module.scss';

export const Matrix = () => {
  // Use a grid that fits on most phones if the width of the screen is small, otherwise use a larger matrix.
  const isScreenSmall = useMediaQuery(900);
  const matrix = isScreenSmall
    ? [...Array(10).map(() => [...Array(6)])]
    : [...Array(20).map(() => [...Array(20)])];

  console.log(matrix);

  return (
    <div className={styles.matrixContainer}>
      <div className={styles.matrixTitle}>Square Grid</div>
      {/* A grid that holds all of the squares. */}
      <div className={styles.squareContainer}>
        {matrix.map((row) => (
          <div className={styles.row}>
            {matrix.map((column) => (
              <div className={styles.square} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
