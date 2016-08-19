import React, { Component, PropTypes, forceUpdate } from 'react';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { createContainer } from 'meteor/react-meteor-data';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Roles } from 'meteor/alanning:roles';
import { _ } from 'meteor/underscore';
import { LocalState } from '../../../api/local-state/client/namespace.js';
import { AuxFunctions } from '../../../api/aux-functions/api.js';
import { Users } from '../../../api/users/namespace.js';
import '../../../api/users/api.js'; // Users.api
import { ViewDispatcher } from '../../components/view-dispatcher.jsx';
import { SignupDesktop } from './signup-desktop.jsx';
import { SignupMobile } from './signup-mobile.jsx';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
/**
* @todo change name to SignupPage
*/
class Signup extends Component {
  // See ES6 Classes section at: https://facebook.github.io/react/docs/reusable-components.html
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAvatarSelect = this.handleAvatarSelect.bind(this);
  }

  handleInputChange({ fieldName, value }) { // { fieldName: 'username', value: 'Juan' }
    // console.log(`fieldName: ${fieldName}, value: ${value}`);
    const { errors } = this.props;
    LocalState.set(`signup.${fieldName}`, value);

    // Clear both password and password2 fields in case of no matching and then
    // changing one of them
    if ((fieldName === 'password' || fieldName === 'password2') &&
      (errors.password.length > 0 && errors.password[0] === 'Password does not match')) {
      LocalState.set('signup.errors',
        AuxFunctions.clearErrors(errors, ['password', 'password2']));
    } else {
      LocalState.set('signup.errors', AuxFunctions.clearErrors(errors, fieldName));
    }
    // Force component to update otherwise cursor moves to the end of the input
    // field
    forceUpdate();
  }

  handleAvatarSelect(avatarName) {
    LocalState.set('signup.selectedAvatar', avatarName);
  }

  handleSubmit(evt) {
    evt.preventDefault();

    const { username, email, password, password2, selectedAvatar, terms } = this.props;
    const newUser = {
      username,
      email,
      password,
      password2,
      terms,
    };

    // Disable submit button
    LocalState.set('signup.canSubmit', false);

    // Check for errors
    let errors = Users.api.checkSignupFields(newUser);
    if (AuxFunctions.hasErrors(errors)) {
      // Display errors on UI
      LocalState.set('signup.errors', errors);
      // Re-enable submit button
      LocalState.set('signup.canSubmit', true);
      return;
    }

    // Prepare data to be inserted
    _.omit(newUser, ['password2', 'terms']);
    _.extend(newUser, {
      profile: {
        avatar: selectedAvatar,
      },
    });

    Accounts.createUser(newUser, (err1) => {
      if (err1) {
        /* for (const key in err1) {
          console.log(`err.${key}: ${err1[key]}`);
        } */
        errors = Users.api.handleCreateUserErrors(err1);
        if (AuxFunctions.hasErrors(errors)) {
          // Display errors on UI
          LocalState.set('signup.errors', errors);
        }
        // Re-enable submit button
        LocalState.set('signup.canSubmit', true);
      } else {
        console.log('[signup] Success!');
        Meteor.call('EmailSystem.api.sendVerificationLink', (err2) => {
          if (err2) {
            console.log(`[send-verification-link] ${err2.reason}`);
            // Re-enable submit button
            LocalState.set('signup.canSubmit', true);
          } else {
            console.log('[send-verification-link] Success!');
            LocalState.api.clearField('signup');
            FlowRouter.go('confirm-email'); // TODO: do not redirect, render template in place
          }
        });
      }
    });
  }

  render() {
    return (
      <ViewDispatcher
        {...this.props}
        handleSubmit={this.handleSubmit}
        handleInputChange={this.handleInputChange}
        handleAvatarSelect={this.handleAvatarSelect}
        breakpoint="768"
        mobileView={SignupMobile}
        desktopView={SignupDesktop}
      />
    );
  }
}

Signup.propTypes = {
  curUser: PropTypes.object,
  canSubmit: PropTypes.bool.isRequired,
  username: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  password2: PropTypes.string.isRequired,
  selectedAvatar: PropTypes.string.isRequired,
  terms: PropTypes.bool.isRequired,
  errors: PropTypes.object.isRequired,
};
//------------------------------------------------------------------------------
/**
* @summary Wrapper around 'Signup' component to handle component-level
* subscriptions and pass data down to Signup component.
* @todo change name to SignupPageComponent
*/
export const SignupPage = createContainer(() => {
  // Make sure the viewer is not logged in
  if (Meteor.user()) {
    FlowRouter.go('index');
    return {};
  }

  // Component-level subscriptions go here
  // const subs = Meteor.subscribe('Domain.publications.Name', arguments);
  // domain = subs && Domain.collections.find().fetch();

  return {
    curUser: Meteor.user(),
    canSubmit: LocalState.get('signup.canSubmit'),
    username: LocalState.get('signup.username'),
    email: LocalState.get('signup.email'),
    password: LocalState.get('signup.password'),
    password2: LocalState.get('signup.password2'),
    selectedAvatar: LocalState.get('signup.selectedAvatar'),
    terms: LocalState.get('signup.terms'),
    errors: LocalState.get('signup.errors'),
  };
}, Signup);
