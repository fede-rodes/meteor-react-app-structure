import React, { PropTypes } from 'react';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
/**
* @summary Wrapper container used to control how other components are laid out
* on screen.
* @example <Blank>Stuff</Blank>
*/
export const Blank = ({ children }) => (
  <div>
    <main>{children}</main>
  </div>
);

Blank.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
};
