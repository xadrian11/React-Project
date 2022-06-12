import React from 'react';
import styles from './Modal.module.css';
import ReactModal from 'react-modal';
import PropTypes from 'prop-types';
import clsx from 'clsx';

ReactModal.setAppElement('#root');

export default function Modal({ isOpen, onClose, children, className }) {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={clsx(styles.mymodal, className)}
      overlayClassName={styles.myoverlay}
    >
      {children}
      <button className={styles.closeButton} onClick={onClose}>
        &times;
      </button>
    </ReactModal>
  );
}
Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};
