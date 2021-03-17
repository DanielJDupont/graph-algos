import styles from './index.module.scss';

export const Footer: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.createdBy}>Daniel Dupont | Graph Algos © 2020</div>
      <div className={styles.shields}>
        <img
          alt="GitHub"
          src="https://img.shields.io/github/license/danieljdupont/graph-algos?logo=MIT&color=9cf"
        />
        <img
          alt="GitHub code size in bytes"
          src="https://img.shields.io/github/languages/code-size/danieljdupont/graph-algos?color=9cf"
        />
        <img
          alt="GitHub language count"
          src="https://img.shields.io/github/languages/count/danieljdupont/graph-algos?color=9cf"
        />
        <img
          alt="GitHub top language"
          src="https://img.shields.io/github/languages/top/danieljdupont/graph-algos?color=9cf"
        />
        <img
          alt="Scrutinizer code quality (GitHub/Bitbucket)"
          src="https://img.shields.io/scrutinizer/quality/g/danieljdupont/graph-algos/main?color=9cf"
        />
      </div>
    </div>
  );
};
