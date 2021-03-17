import { useContext } from 'react';
import clsx from 'clsx';

import { MatrixContext } from '../matrixContext';
import { MouseMode } from '../dataTypes';

import { DirectionsRunOutlined } from '@material-ui/icons';
import { Tooltip, Button } from '@material-ui/core';

import styles from './buttons.module.scss';

export const StartAnimationButton = () => {
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
