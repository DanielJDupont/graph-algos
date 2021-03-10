import { useContext } from 'react';
import clsx from 'clsx';

import { AlgorithmChoice, MouseMode } from '../dataTypes';
import { depthFirstSearch } from '../matrix/algorithms';
import { MatrixContext } from '../matrixContext';

import { Button, MenuItem, Select } from '@material-ui/core';

import styles from './index.module.scss';

export const Navbar = () => {
  const {
    mouseMode,
    setMouseMode,
    startSquareID,
    setIsDisplayingAlgorithm,
    algorithmChoice,
    setAlgorithmChoice,
    matrix,
    setProcessList,
  } = useContext(MatrixContext);

  return (
    <div className={styles.navbarContainer}>
      <div className={styles.navbarTitle}>
        Interactive Graph Algorithm Visualizer
      </div>

      <Select
        value={algorithmChoice}
        onChange={(event: any) => setAlgorithmChoice(event.target.value)}
      >
        <MenuItem value={AlgorithmChoice.ChooseYourAlgorithm} disabled>
          Choose Your Algorithm
        </MenuItem>

        <MenuItem value={AlgorithmChoice.DepthFirstSearch}>
          Depth First Search
        </MenuItem>

        <MenuItem value={AlgorithmChoice.BreadthFirstSearch}>
          Breadth First Search
        </MenuItem>
      </Select>

      <Button
        className={clsx(
          styles.button,
          mouseMode === MouseMode.StartingPoint && styles.buttonActive
        )}
        variant="contained"
        onClick={() => {
          if (mouseMode !== MouseMode.StartingPoint) {
            setMouseMode(MouseMode.StartingPoint);
          } else if (mouseMode === MouseMode.StartingPoint) {
            setMouseMode(MouseMode.NormalPoint);
          }
        }}
      >
        Starting Point
      </Button>

      <Button
        className={clsx(
          styles.button,
          mouseMode === MouseMode.EndingPoint && styles.buttonActive
        )}
        variant="contained"
        onClick={() => {
          if (mouseMode !== MouseMode.EndingPoint) {
            setMouseMode(MouseMode.EndingPoint);
          } else if (mouseMode === MouseMode.EndingPoint) {
            setMouseMode(MouseMode.NormalPoint);
          }
        }}
      >
        Ending Point
      </Button>

      <Button
        className={styles.button}
        style={{ marginLeft: '20px' }}
        variant="contained"
        onClick={() => {
          depthFirstSearch(
            parseInt(startSquareID.split(' ')[0]),
            parseInt(startSquareID.split(' ')[1]),
            matrix,
            setProcessList
          );
          setIsDisplayingAlgorithm(true);
        }}
      >
        Start Animation
      </Button>
    </div>
  );
};
