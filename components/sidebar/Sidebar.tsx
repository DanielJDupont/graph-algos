import { useState } from 'react';
import clsx from 'clsx';

import { KeyboardArrowRight, KeyboardArrowLeft } from '@material-ui/icons';

import styles from './Sidebar.module.scss';

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={clsx(
        !isOpen && styles.container,
        isOpen && styles.openContainer
      )}
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className={styles.sidebarContents}>
        {!isOpen && <KeyboardArrowRight className={styles.icon} />}
        {isOpen && <KeyboardArrowLeft className={styles.icon} />}
      </div>
    </div>
  );
};
