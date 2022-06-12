import React from 'react';
import PropTypes from 'prop-types';

import styles from './Form.module.css';

function Form({ children, ...restProps }) {
  return (
    <form data-testid="form" className={styles.form} {...restProps}>
      {children}
    </form>
  );
}

Form.propTypes = {
  children: PropTypes.any,
};

export default Form;
