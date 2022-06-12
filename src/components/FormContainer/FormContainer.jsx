import React from 'react';
import PropTypes from 'prop-types';
import styles from './FormContainer.module.css';

function FormContainer({ children }) {
  return <div className={styles.formContainer}>{children}</div>;
}

FormContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default FormContainer;
