import styles from './index.module.scss';

export const Navbar = () => {
  return (
    <div className={styles.navbarContainer}>
      <div className={styles.navbarTitle}>
        Interactive Graph Algorithm Visualizer
      </div>
      <div className={styles.navbarItem}>Matrix Layout</div>
      <div className={styles.navbarItem}>Vertexes and Edges Layout</div>
    </div>
  );
};
