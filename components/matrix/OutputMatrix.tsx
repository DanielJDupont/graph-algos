import { useContext } from 'react';
import Anime from 'react-animejs-wrapper';

import { MatrixContext } from '../matrixContext';
import { AnimatedSquare } from '../dataTypes';

import { DirectionsRun } from '@material-ui/icons';

import styles from './OutputMatrix.module.scss';

export const OutputMatrix: React.FC = () => {
  const { startSquareID, endSquareID, processList, matrix } = useContext(
    MatrixContext
  );

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
        animated: square.isBlocked
          ? false
          : filteredProcessList.findIndex((id) => id === square.id) * 50 >= 0,
        isBlocked: square.isBlocked,
        isProcessed: square.isProcessed,
        delay: square.isBlocked
          ? -1
          : filteredProcessList.findIndex((id) => id === square.id) * 50,
      };
    })
  );

  return (
    <div className={styles.matrixContainer}>
      {/* Display Matrix with Animation */}
      {displayMatrix.map((row, key) => (
        <div className={styles.row} key={key}>
          {row.map((square) => {
            if (square.animated && square.id !== startSquareID) {
              return (
                <div className={styles.normalSquare}>
                  <Anime
                    style={{
                      width: '35px',
                      height: '35px',
                    }}
                    config={{
                      keyframes: [
                        {},
                        {
                          scale: [0, 1],
                          backgroundColor: ['#36456d', '#6c88d6'],
                          borderRadius: ['40%', '0%'],
                          easing: 'spring(1, 30, 10, 0)',
                        },

                        {
                          backgroundColor: ['#6c88d6', '#5161f3'],
                          easing: 'spring(1, 30, 10, 0)',
                        },
                      ],
                      delay: square.delay,
                    }}
                  >
                    <div className={styles.normalSquare} key={square.id} />
                  </Anime>
                </div>
              );
            } else if (square.isBlocked) {
              return <div className={styles.blockedSquare} />;
            } else if (square.id === endSquareID) {
              return <div className={styles.endSquare} />;
            } else if (square.id === startSquareID) {
              return (
                <div className={styles.startSquare}>
                  {square.id === startSquareID && (
                    <DirectionsRun className={styles.startSquareIcon} />
                  )}
                </div>
              );
            } else {
              return <div className={styles.normalSquare} />;
            }
          })}
        </div>
      ))}
    </div>
  );
};
