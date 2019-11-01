import React  from 'react';
import PropTypes from 'prop-types';
import styles from './TextInput.module.scss';

const TextInput = ({
  onClick,
  handleChange, 
  placeholder, 
  value,
  type,
  name,
  className,
  error,
}) => (
  <div onClick={onClick} className={styles.Wrapper}>
    <input 
      type={type}
      value={value} 
      onChange={handleChange} 
      placeholder={placeholder}
      name={name}
      className={styles.Input}
      required
    />
    <div className={styles.Error}>{error}</div>
  </div>
);

TextInput.propTypes = {
  onClick: PropTypes.func,
  handleChange: PropTypes.func,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  className: PropTypes.string,
  error: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool
  ]),
};

export default TextInput;
