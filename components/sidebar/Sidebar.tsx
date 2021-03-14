import { useState } from 'react';
import clsx from 'clsx';

import { KeyboardArrowRight, KeyboardArrowLeft } from '@material-ui/icons';

import styles from './Sidebar.module.scss';

export const Sidebar = () => {
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
        {!isOpen && <KeyboardArrowRight className={styles.icon} />}
        {isOpen && <KeyboardArrowLeft className={styles.icon} />}

        <div
          className={clsx(
            isOpen ? styles.sidebarContents : styles.sidebarFaded
          )}
        >
          <div>Set the starting point.</div>
          <div>Set the ending point.</div>
          <div>
            Create walls to alter the path of your algorithm by clicking and
            dragging.
          </div>
          <div>Automatically generate mazes or clear all walls.</div>
          <div>Select an algorithm and run your algorithm.</div>
          <div>Reset and change what you like.</div>
        </div>
      </div>
    </div>
  );
};
