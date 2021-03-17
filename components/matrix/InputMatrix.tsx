import { useContext } from 'react';
import clsx from 'clsx';

import { MatrixContext } from '../matrixContext';
import { MouseMode, SET_SQUARE } from '../dataTypes';

import { DirectionsRun } from '@material-ui/icons';

import styles from './InputMatrix.module.scss';

export const InputMatrix: React.FC = () => {
  const {
    matrix,
    startSquareID,
    endSquareID,
    setSquareID,
    mouseMode,
    setMatrix,
  } = useContext(MatrixContext);

  return (
    <div className={styles.matrixContainer}>
      {matrix.map((row, rowIndex) => (
        <div className={styles.row} key={rowIndex}>
          {row.map((square) => {
            return (
              <div
                className={clsx(styles.normalSquare)}
                onMouseDown={() => {
                  // Click to set the start square only if start square button is set.
                  if (mouseMode === MouseMode.StartingPoint) {
                    setSquareID(square.id, SET_SQUARE.START);
                  }

                  // Click to set the end square only if the ending point button is clicked.
                  else if (mouseMode === MouseMode.EndingPoint) {
                    setSquareID(square.id, SET_SQUARE.END);
                  }

                  // Click to remove individual blocked squares.
                  else {
                    setMatrix(
                      matrix.map((row) =>
                        row.map((_square) => {
                          if (_square.id === square.id) {
                            return {
                              id: _square.id,
                              isProcessed: !square.isProcessed,
                              isBlocked: !square.isBlocked,
                            };
                          } else return _square;
                        })
                      )
                    );
                  }
                }}
                onMouseEnter={(mouseEvent) => {
                  // If the user is entering the square while holding down the left mouse button.
                  if (mouseEvent.buttons === 1) {
                    if (mouseMode === MouseMode.EndingPoint) {
                      setSquareID(square.id, SET_SQUARE.END);
                    } else if (mouseMode === MouseMode.StartingPoint) {
                      setSquareID(square.id, SET_SQUARE.START);
                    } else {
                      setMatrix(
                        matrix.map((row) =>
                          row.map((_square) => {
                            if (
                              _square.id === square.id &&
                              _square.id !== startSquareID &&
                              _square.id !== endSquareID
                            ) {
                              return {
                                id: _square.id,
                                isProcessed: !square.isProcessed,
                                isBlocked: !square.isBlocked,
                              };
                            } else return _square;
                          })
                        )
                      );
                    }
                  }
                }}
                key={square.id}
              >
                {square.isProcessed && <div className={styles.greySquare} />}
                {square.id === startSquareID && (
                  <div className={styles.startSquare}>
                    <DirectionsRun className={styles.startSquareIcon} />
                  </div>
                )}

                {square.id === endSquareID && (
                  <div className={styles.normalSquare}>
                    <div className={styles.endSquare} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};
