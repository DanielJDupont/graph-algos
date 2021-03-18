import { useContext } from 'react';
import clsx from 'clsx';

import { MatrixContext } from '../../matrixContext';
import { breadthFirstSearch, depthFirstSearch } from '../../matrix/algorithms';
import { AlgorithmChoice, MouseMode } from '../../dataTypes';

import { Tooltip, Button } from '@material-ui/core';
import {
  DirectionsRunOutlined,
  FlagOutlined,
  PlayCircleOutline,
  ReplayOutlined,
} from '@material-ui/icons';

import styles from './buttons.module.scss';

export const StartingPointButton: React.FC = () => {
  const { mouseMode, setMouseMode, isDisplayingAlgorithm } = useContext(
    MatrixContext
  );

  return (
    <Tooltip title="Set the starting point of the algorithm!" enterDelay={300}>
      <Button
        className={clsx(
          styles.button,
          mouseMode === MouseMode.StartingPoint && styles.buttonActive
        )}
        disabled={isDisplayingAlgorithm}
        variant="contained"
        onClick={() => {
          if (mouseMode !== MouseMode.StartingPoint) {
            setMouseMode(MouseMode.StartingPoint);
          } else if (mouseMode === MouseMode.StartingPoint) {
            setMouseMode(MouseMode.NormalPoint);
          }
        }}
      >
        <DirectionsRunOutlined className={styles.icon} />
        Starting Point
      </Button>
    </Tooltip>
  );
};

export const EndingPointButton: React.FC = () => {
  const { mouseMode, setMouseMode, isDisplayingAlgorithm } = useContext(
    MatrixContext
  );

  return (
    <Tooltip
      title="Click to set a square where the algorithm will end!"
      enterDelay={300}
    >
      <Button
        className={clsx(
          styles.button,
          mouseMode === MouseMode.EndingPoint && styles.buttonActive
        )}
        disabled={isDisplayingAlgorithm}
        variant="contained"
        onClick={() => {
          if (mouseMode !== MouseMode.EndingPoint) {
            setMouseMode(MouseMode.EndingPoint);
          } else if (mouseMode === MouseMode.EndingPoint) {
            setMouseMode(MouseMode.NormalPoint);
          }
        }}
      >
        <FlagOutlined className={styles.icon} />
        Ending Point
      </Button>
    </Tooltip>
  );
};

export const StartAnimationButton: React.FC = () => {
  const {
    algorithmChoice,
    isDisplayingAlgorithm,
    setIsDisplayingAlgorithm,
    startSquareID,
    matrix,
    setProcessList,
  } = useContext(MatrixContext);

  return (
    <Button
      className={clsx(
        styles.button,
        (algorithmChoice === AlgorithmChoice.ChooseYourAlgorithm ||
          isDisplayingAlgorithm) &&
          styles.buttonDisabled
      )}
      variant="contained"
      disabled={
        algorithmChoice === AlgorithmChoice.ChooseYourAlgorithm ||
        isDisplayingAlgorithm
      }
      onClick={() => {
        if (algorithmChoice === AlgorithmChoice.BreadthFirstSearch) {
          breadthFirstSearch(startSquareID, matrix, setProcessList);
        } else if (algorithmChoice === AlgorithmChoice.DepthFirstSearch) {
          depthFirstSearch(startSquareID, matrix, setProcessList);
        }

        setIsDisplayingAlgorithm(true);
      }}
    >
      <PlayCircleOutline className={styles.icon} />
      Start Animation
    </Button>
  );
};

export const ResetButton: React.FC = () => {
  const {
    setIsDisplayingAlgorithm,
    setMatrix,
    isDisplayingAlgorithm,
    setProcessList,
    matrix,
  } = useContext(MatrixContext);

  return (
    <Button
      className={clsx(styles.button)}
      disabled={!isDisplayingAlgorithm}
      variant="contained"
      onClick={() => {
        // Wipe out the matrix so nothing is processed anymore.
        setMatrix(
          matrix.map((row) =>
            row.map((square) => {
              if (!square.isBlocked) {
                return { ...square, isProcessed: false };
              } else {
                // Squares that are blocked must also be marked as having been processed.
                return {
                  ...square,
                  isProcessed: true,
                  isBlocked: true,
                };
              }
            })
          )
        );
        setIsDisplayingAlgorithm(false);
        setProcessList([]);
      }}
    >
      <ReplayOutlined className={styles.icon} />
      Reset
    </Button>
  );
};
