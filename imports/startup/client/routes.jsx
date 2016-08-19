import React from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { mount } from 'react-mounter';
import { Accounts } from 'meteor/accounts-base';
import { Bert } from 'meteor/themeteorchef:bert';
import { AppContainer } from '../../ui/layouts/app-container.jsx';
import { SignupPage } from '../../ui/pages/signup/signup-page.jsx';
import { NotFoundPage } from '../../ui/pages/not-found-page.jsx';
import { LocalState } from '../../api/local-state/client/namespace.js';
import '../../api/local-state/client/api.js'; // LocalState.api

console.log('[router] loading routes');

//------------------------------------------------------------------------------
// AUX FUNCTIONS:
//------------------------------------------------------------------------------
function clearSignupPageLocalState() {
  LocalState.api.initField('signup');
}
//------------------------------------------------------------------------------
// ROUTES:
//------------------------------------------------------------------------------
/* FlowRouter.route('/', {
  name: 'index',
  action() {
    mount(AppContainer, {
      content: () => <HomePage />,
    });
  },
  // calls when when we decide to move to another route
  // but calls before the next route started
  triggersExit: [clearHomePageLocalState],
}); */

FlowRouter.route('/signup', {
  name: 'signup',
  action() {
    mount(AppContainer, {
      content: () => <SignupPage />,
    });
  },
  // calls when when we decide to move to another route
  // but calls before the next route started
  triggersExit: [clearSignupPageLocalState],
});

FlowRouter.notFound = {
  action() {
    mount(AppContainer, {
      content: () => <NotFoundPage />,
    });
  },
};
