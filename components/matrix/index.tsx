import { useWindowDimensions } from './index.hooks';

import styles from './index.module.scss';

export const Matrix = () => {
  const { width, height } = useWindowDimensions();

  const numberOfRows = Math.floor(height / 30);
  const numberOfColumns = Math.floor(width / 30);

  const matrix = Array(numberOfRows).map(() => [...Array(numberOfColumns)]);

  return (
    <div className={styles.matrixContainer}>
      <div className={styles.matrixTitle}>Square Grid</div>

      {/* A grid that holds all of the squares. */}
      <div className={styles.squareContainer}>
        {matrix.map((row) => (
          <div className={styles.row}>
            {matrix.map((column) => (
              <div className={styles.square}>Square</div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
