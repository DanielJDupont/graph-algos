import { useState } from 'react';
import clsx from 'clsx';

import { KeyboardArrowRight, KeyboardArrowLeft } from '@material-ui/icons';

import styles from './index.module.scss';

export const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div
      className={clsx(
        !isOpen && styles.container,
        isOpen && styles.openContainer
      )}
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className={styles.sidebar}>
        <div className={styles.topContainer}>
          <div className={styles.title}>Tutorial</div>
          {!isOpen && <KeyboardArrowRight className={styles.icon} />}
          {isOpen && <KeyboardArrowLeft className={styles.icon} />}
        </div>

        <div
          className={clsx(
            isOpen ? styles.sidebarContents : styles.sidebarFaded
          )}
        >
          <div>
            <div className={styles.tutorialText}>Set the starting point.</div>
            <img src="startPoint.gif" />
          </div>

          <div>
            <div className={styles.tutorialText}>Set the ending point.</div>
            <img src="endPoint.gif" />
          </div>

          <div>
            <div className={styles.tutorialText}>
              Create walls to alter the path of your algorithm by clicking and
              dragging.
            </div>
            <img src="walls.gif" />
          </div>

          <div>Automatically generate mazes or clear all walls.</div>

          <div>
            <div className={styles.tutorialText}>
              Select an algorithm and run.
            </div>
            <img
              src="chooseyouralgo.gif"
              style={{ width: '226px', height: '141px' }}
            />
          </div>

          <div>
            <div className={styles.tutorialText}>
              Reset and change what you like.
            </div>
            <img src="reset.gif" />
          </div>
        </div>
      </div>
    </div>
  );
};
