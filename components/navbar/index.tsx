import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import styles from './index.module.scss';

export const Navbar = () => {
  return (
    <div className={styles.navbarContainer}>
      <div className={styles.navbarTitle}>
        Interactive Graph Algorithm Visualizer
      </div>
    </div>
  );
};
