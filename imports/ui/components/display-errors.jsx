import React, { PropTypes, Component } from 'react';
import { _ } from 'meteor/underscore';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
export class DisplayErrors extends Component {
  render() {
    const { errors, fieldName } = this.props;

    // Check arguments
    if (!errors || !fieldName) {
      console.log('Missing args at DisplayErros component');
      return null;
    }
    if (!_.has(errors, fieldName) || !_.isArray(errors[fieldName])) {
      console.log('Wrong args at DisplayErrors component');
      return null;
    }
    if (errors.length === 0) {
      return null;
    }

    // Get error message(s)
    const message = errors[fieldName].map((error, index) => (
      <div key={index} className="error-message">{error}</div>
    ));
    return message;
  }
}

DisplayErrors.propTypes = {
  errors: PropTypes.object.isRequired,
  fieldName: PropTypes.string.isRequired,
};
