import { useContext, useState } from 'react';

import { MatrixContext } from '../matrixContext';
import { getWindowDimensions } from '../hooks/windowDimensions';
import {
  EndingPointButton,
  ResetButton,
  StartAnimationButton,
  StartingPointButton,
} from './inputElements/buttons';
import {
  AlgorithmSelector,
  MazeGeneratorSelector,
  PlaybackSpeedSelector,
} from './inputElements/selectors';

import { Button, MenuItem, Menu, makeStyles, Theme } from '@material-ui/core';
import { GitHub } from '@material-ui/icons';

import styles from './index.module.scss';

const useStyles = makeStyles((theme: Theme) => ({
  menu: {
    backgroundColor: 'rgba(31, 59, 68, 0.5)',
    '& .MuiPaper-root': {
      backgroundColor: '#3276d2',
    },
  },
}));

export const Navbar: React.FC = () => {
  const { isDisplayingAlgorithm, width } = useContext(MatrixContext);

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
            className={styles.controlsButton}
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleClick}
          >
            View Controls
          </Button>
          <Menu
            id="controlsMenu"
            className={useStyles().menu}
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
          {width >= 500 && <div>View On Github</div>}
        </div>
      </a>
    </div>
  );
};
