import React from 'react';
import PropTypes from 'prop-types';

import styles from './SubmitButton.module.css';

function SubmitButton({ buttonContent, ...restProps }) {
  return (
    <button {...restProps} className={styles.submitbtn} type="submit">
      {buttonContent}
    </button>
  );
}

SubmitButton.propTypes = {
  buttonContent: PropTypes.string.isRequired,
};

export default SubmitButton;
