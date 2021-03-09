import { useContext } from 'react';

import { MatrixContext } from '../matrixContext';

import styles from './index.module.scss';

export const Navbar = () => {
  const { mouseMode } = useContext(MatrixContext);

  return (
    <div className={styles.navbarContainer}>
      <div className={styles.navbarTitle}>
        Interactive Graph Algorithm Visualizer
      </div>
      {mouseMode}
    </div>
  );
};
