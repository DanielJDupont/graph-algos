import { useContext } from 'react';
import clsx from 'clsx';

import { MatrixContext } from '../matrixContext';
import { breadthFirstSearch, depthFirstSearch } from '../matrix/algorithms';
import { AlgorithmChoice, MouseMode } from '../dataTypes';

import { DirectionsRunOutlined, PlayCircleOutline } from '@material-ui/icons';
import { Tooltip, Button } from '@material-ui/core';

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
      className={styles.button}
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
