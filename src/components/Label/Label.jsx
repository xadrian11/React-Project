import React from 'react';
import PropTypes from 'prop-types';

import styles from './Label.module.css';

function Label({ htmlFor, labelContent }) {
  return (
    <label data-testid="label" className={styles.label} htmlFor={htmlFor}>
      {labelContent}
    </label>
  );
}

Label.propTypes = {
  htmlFor: PropTypes.string.isRequired,
  labelContent: PropTypes.string.isRequired,
};

export default Label;
