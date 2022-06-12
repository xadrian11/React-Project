import React from 'react';
import styles from './Loader.module.css';

const Loader = () => {
  return (
    <div data-testid="loader" className={styles.wrapper}>
      <div className={styles.loader}></div>
    </div>
  );
};

export default Loader;
