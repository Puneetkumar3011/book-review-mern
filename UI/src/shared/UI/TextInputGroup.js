import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import "./TextInputGroup.css";

const TextInputGroup = ({
  label,
  name,
  value,
  placeholder,
  type,
  onChange,
  isValid
}) => {
  return (
    <div className="form-group">
      <label className="input-label" htmlFor={name}>{label}</label>
      <input
        type={type}
        name={name}
        className={classnames('form-control form-control-lg', {
          'is-invalid': !isValid
        })}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {!isValid && <div className="invalid-feedback">{!isValid}</div>}
    </div>
  );
};

TextInputGroup.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string
};

TextInputGroup.defaultProps = {
  type: 'text'
};

export default TextInputGroup;
