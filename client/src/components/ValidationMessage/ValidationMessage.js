import React from 'react';
import PropTypes from 'prop-types';
import styles from './ValidationMessage.module.scss';

const ValidationMessage = ({ status, text }) => (
  <div className={`${styles.Message} 
    ${status ? styles.Success : styles.Error}`}
  >
    {text}
  </div>
);

ValidationMessage.propTypes = {
  status: PropTypes.string,
  text: PropTypes.string,
};

export default ValidationMessage;

