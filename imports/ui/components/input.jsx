import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { DisplayErrors } from './display-errors.jsx';

//------------------------------------------------------------------------------
// GLOBALS:
//------------------------------------------------------------------------------
const styles = {
  div: {
    marginBottom: '30px',
  },
  input: {
    display: 'block',
    width: '100%',
  },
};

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
export class Input extends Component {
  // See ES6 Classes section at: https://facebook.github.io/react/docs/reusable-components.html
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange() {
    // Get context
    const { fieldName } = this.props;
    // Get data
    const value = ReactDOM.findDOMNode(this.refs[fieldName]).value;
    // console.log(`fieldName: ${fieldName}, value: ${value}`);
    // Pass data up to parent component
    this.props.onChange({ fieldName, value });
  }

  render() {
    const { inputType, fieldName, label, placeholder, isRequired, value, errors } = this.props;
    return (
      <div className="form-group" style={styles.div}>
        <label htmlFor={fieldName}>{label} {isRequired ? '*' : ''}</label>
        <input
          ref={fieldName}
          type={inputType}
          style={styles.input}
          id={fieldName}
          placeholder={placeholder}
          value={value}
          onChange={this.handleChange}
        />
        <DisplayErrors errors={errors} fieldName={fieldName} />
      </div>
    );
  }
}

Input.propTypes = {
  inputType: PropTypes.string.isRequired,
  fieldName: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  isRequired: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};
