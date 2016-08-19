import React, { Component, PropTypes } from 'react';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
export class DisplaySelectedAvatar extends Component {
  // See ES6 Classes section at: https://facebook.github.io/react/docs/reusable-components.html
  constructor(props) {
    super(props);
  }

  render() {
    const { selectedAvatar } = this.props;
    if (!selectedAvatar) {
      return null;
    }
    return (
      <img
        src={`/icons/${selectedAvatar}.svg`}
        alt={selectedAvatar}
        height="45"
        width="45"
        className="selected-avatar"
      />
    );
  }
}

DisplaySelectedAvatar.propTypes = {
  selectedAvatar: PropTypes.string.isRequired,
};
