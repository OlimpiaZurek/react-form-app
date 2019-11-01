import React from 'react';
import PropTypes from 'prop-types';
import styles from './Button.module.scss';

const Button = ({ children }) => (
  <button className={styles.Btn}>{children}</button>
);

Button.propTypes = {
  children: PropTypes.node,
}

export default Button;
