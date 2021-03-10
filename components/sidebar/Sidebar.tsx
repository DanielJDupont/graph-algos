import { KeyboardArrowRight } from '@material-ui/icons';

import styles from './Sidebar.module.scss';

export const Sidebar = () => {
  return (
    <div className={styles.container}>
      <KeyboardArrowRight className={styles.icon} />
    </div>
  );
};
