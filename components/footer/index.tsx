import styles from './index.module.scss';

export const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.createdBy}>
        Created by Daniel Dupont | Graph Algos © 2020
      </div>
      <div></div>
    </div>
  );
};
