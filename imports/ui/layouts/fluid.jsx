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
* <Fluid>Content</Fluid>
*/
export const Fluid = ({ children }) => (
  <div className="fluid-layout-container">
    <HeaderContainer />
    <main className="container-fluid app-bottom-padding">
      {children}
    </main>
    {/* <Footer /> */}
  </div>
);

Fluid.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
};
