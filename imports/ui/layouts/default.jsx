import React, { PropTypes } from 'react';
import { HeaderContainer } from '../components/header/header.jsx';
// import { Footer } from '../components/footer.jsx';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
/**
* @summary Wrapper container used to control how other components are laid out
* on screen.
* @example
* <Default width="Number">
*   Content
* </Default>
*/
export const Default = ({ children, width }) => (
  <div className="default-layout-container">
    <HeaderContainer />
    <main
      className="container app-bottom-padding"
      style={{ maxWidth: width }}
    >
      {children}
    </main>
    {/* <Footer /> */}
  </div>
);

Default.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
  width: PropTypes.string.isRequired, // '940px', '100%'
};
