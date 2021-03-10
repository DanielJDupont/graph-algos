import { useContext } from 'react';
import clsx from 'clsx';

import { MatrixContext } from '../matrixContext';
import { MouseMode } from '../dataTypes';

import styles from './InputMatrix.module.scss';

export const InputMatrix: React.FC<{}> = () => {
  const {
    matrix,
    startSquareID,
    setStartSquareID,
    endSquareID,
    setEndSquareID,
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
                className={clsx(
                  styles.normalSquare,
                  square.id === startSquareID && styles.startSquare,
                  square.id === endSquareID && styles.endSquare
                )}
                onMouseDown={() => {
                  // Click to set the start square only if start square button is set.
                  if (mouseMode === MouseMode.StartingPoint) {
                    setStartSquareID(square.id);
                  }

                  // Click to set the end square only if the ending point button is clicked.
                  else if (mouseMode === MouseMode.EndingPoint) {
                    setEndSquareID(square.id);
                  }

                  // Click to remove individual dark grey squares.
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
                      setEndSquareID(square.id);
                    } else if (mouseMode === MouseMode.StartingPoint) {
                      setStartSquareID(square.id);
                    } else {
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
                  }
                }}
                key={square.id}
              >
                {square.isProcessed && <div className={styles.greySquare} />}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};
