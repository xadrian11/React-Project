import React from 'react';
import PropTypes from 'prop-types';

import styles from './FormControl.module.css';

function FormControl(props) {
  return (
    <div data-testid="form-control" className={styles.formcontrol}>
      {props.children}
    </div>
  );
}

FormControl.propTypes = {
  children: PropTypes.any,
};

export default FormControl;
