import React from 'react';
import PropTypes from 'prop-types';

import styles from './Input.module.css';

function Input({ id, type, name, ...restProps }) {
  return (
    <input
      data-testid="input"
      className={styles.input}
      id={id}
      type={type}
      name={name}
      {...restProps}
    />
  );
}

Input.propTypes = {
  id: PropTypes.any,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default Input;
