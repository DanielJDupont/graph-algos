import { useContext, useState } from 'react';
import clsx from 'clsx';

import { MatrixContext } from '../matrixContext';
import { useWindowSize } from '../hooks/windowSize';
import {
  AlgorithmSelector,
  EndingPointButton,
  MazeGeneratorSelector,
  PlaybackSpeedSelector,
  ResetButton,
  StartAnimationButton,
  StartingPointButton,
} from './inputElements/inputElements';

import { Button, MenuItem, Menu } from '@material-ui/core';
import { ReplayOutlined, GitHub } from '@material-ui/icons';

import styles from './index.module.scss';

export const Navbar: React.FC = () => {
  const {
    isDisplayingAlgorithm,
    setIsDisplayingAlgorithm,
    algorithmChoice,
    setAlgorithmChoice,
    matrix,
    setMatrix,
    setProcessList,
    playbackSpeed,
    setPlaybackSpeed,
  } = useContext(MatrixContext);

  const { width } = useWindowSize();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={styles.navbarContainer}>
      <div className={styles.navbarTitle}>Graph Algos</div>
      {width >= 1220 ? (
        // Desktop view inputs.
        <div className={styles.controlsContainer}>
          <StartingPointButton />
          <EndingPointButton />
          <MazeGeneratorSelector />
          <AlgorithmSelector />
          <PlaybackSpeedSelector />
          {!isDisplayingAlgorithm ? <StartAnimationButton /> : <ResetButton />}
        </div>
      ) : (
        // Mobile view inputs.
        <>
          <Button
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleClick}
          >
            View Controls
          </Button>
          <Menu
            id="controlsMenu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>
              <StartingPointButton />
            </MenuItem>

            <MenuItem onClick={handleClose}>
              <EndingPointButton />
            </MenuItem>

            <MenuItem onClick={handleClose}>
              <MazeGeneratorSelector />
            </MenuItem>

            <MenuItem onClick={handleClose}>
              <AlgorithmSelector />
            </MenuItem>

            <MenuItem onClick={handleClose}>
              <PlaybackSpeedSelector />
            </MenuItem>

            <MenuItem onClick={handleClose}>
              {!isDisplayingAlgorithm ? (
                <StartAnimationButton />
              ) : (
                <ResetButton />
              )}
            </MenuItem>
          </Menu>
        </>
      )}

      <a href="https://github.com/DanielJDupont/graph-algos" target="_blank">
        <div className={styles.github}>
          <GitHub className={styles.githubIcon} />
          <div>View On Github</div>
        </div>
      </a>
    </div>
  );
};
