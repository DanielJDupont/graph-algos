import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import styles from './index.module.scss';

export const Navbar = () => {
  return (
    <div className={styles.navbarContainer}>
      <IconButton
        className={styles.menuButton}
        edge="start"
        color="inherit"
        aria-label="menu"
      >
        <MenuIcon />
      </IconButton>
      <div className={styles.navbarTitle}>
        Interactive Graph Algorithm Visualizer
      </div>
      <div className={styles.navbarItem}>Matrix Layout</div>
      <div className={styles.navbarItem}>Vertexes and Edges Layout</div>
    </div>
  );
};
