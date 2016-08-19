import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { _ } from 'meteor/underscore';
import { check, Match } from 'meteor/check';
import { Roles } from 'meteor/alanning:roles';
import { Users } from './namespace.js';
import './collection.js'; // Users.collection
import { AuxFunctions } from '../aux-functions/api.js';

//------------------------------------------------------------------------------
/**
* @summary Initialize default admin(s).
*/
Users.api.init = function () {
  console.log('PRE-POPULATE USERS COLLECTION');
  const defaultUsers = [
    { username: 'admin', password: 'AdminPsw', roles: ['admin'] },
  ];

  _.each(defaultUsers, (user) => {
    // Check if user already exist
    const userExists = !!Meteor.users.findOne({ username: user.username });
    if (userExists) {
      return; // skip to the next loop
    }

    // If not, insert user
    const id = Accounts.createUser({
      username: user.username,
      password: user.password,
      profile: { name: user.username },
    });

    if (user.roles.length > 0) {
      // Need _id of existing user record so this call must come
      // after `Accounts.createUser` or `Accounts.onCreate`
      Roles.addUsersToRoles(id, user.roles);
    }
  });
};
//------------------------------------------------------------------------------
/**
* @summary Check whether the given user has verified his/her email address.
*/
Users.api.isAccountVerified = function (userId) {
  check(userId, Match.Maybe(String));

  const user = Meteor.users.findOne({ _id: userId }, { fields: { emails: true } });
  if (!user || !user.emails[0].verified) {
    return false;
  }
  return true;
};
//------------------------------------------------------------------------------
/**
* @summary Verify new user fields before inserting doc into database.
*/
Users.api.checkSignupFields = function (newUser) {
  check(newUser, {
    username: String,
    email: String,
    password: String,
    password2: String,
    terms: Boolean,
  });

  // Destructure
  const {
    username,
    email,
    password,
    password2,
    // selectedAvatar: Match.Optional(String),
    terms,
  } = newUser;

  // Initialize errors
  const errors = {
    username: [],
    email: [],
    password: [],
    password2: [],
    terms: [],
  };

  // Checks
  if (!username) {
    errors.username.push('Username is required');
  }
  if (!email) {
    errors.email.push('Email is required');
  } else if (!AuxFunctions.validateEmail(email)) {
    errors.email.push('Use a valid email');
  }
  if (!password) {
    errors.password.push('Password is required');
  }
  if (!password2) {
    errors.password2.push('Password is required');
  }
  if (password !== password2) {
    errors.password.push('Password does not match');
    errors.password2.push('Password does not match');
  }
  if (!terms) {
    errors.terms.push('You have to accept the terms');
  }

  return errors;
};
//------------------------------------------------------------------------------
/**
* @summary Handle errors from createUser callback.
*/
Users.api.handleCreateUserErrors = function (err) {
  // check(err, Object);

  const { error, reason } = err;

  // Initialize errors
  const errors = {
    username: [],
    email: [],
    password: [],
    password2: [],
    terms: [],
  };

  // Handle known errors firts
  if (error === 403) {
    if (reason === 'Username already exists.') {
      // XXX i18n
      errors.username.push('Username already exists');

    } else if (reason === 'Email already exists.') {
      // XXX i18n
      errors.email.push('Email already exists');
    }
  // Handle unexpected error
  } else {
    // XXX i18n
    errors.username.push('Unexpected error');
    errors.email.push('Unexpected error');
    errors.password.push('Unexpected error');
    errors.password2.push('Unexpected error');
  }

  return errors;
};
//------------------------------------------------------------------------------
/**
* @summary Verify user fields before inserting doc into database.
*/
Users.api.checkLoginFields = function (credentials) {
  check(credentials, {
    email: String,
    password: String,
  });

  // Destructure
  const { email, password } = credentials;

  // Initialize errors
  const errors = {
    email: [],
    password: [],
  };

  // Checks
  if (!email) {
    errors.email.push('Email is required');
  } else if (!AuxFunctions.validateEmail(email)) {
    errors.email.push('Use a valid email');
  }
  if (!password) {
    errors.password.push('Password is required');
  }

  return errors;
};
//------------------------------------------------------------------------------
/**
* @summary Handle errors from loginWithPassword callback.
*/
Users.api.handleLoginWithPasswordErrors = function (err) {
  // check(err, Object);

  const { error, reason } = err;

  // Initialize errors
  const errors = {
    email: [],
    password: [],
  };

  // Handle known errors firts
  if (error === 403) {
    if (reason === 'Incorrect password') {
      // XXX i18n
      errors.password.push(reason);
    } else if (reason === 'User not found') {
      // XXX i18n
      errors.email.push(reason);
    }
  // Handle unexpected error
  } else {
    // XXX i18n
    errors.password.push('Unexpected error');
    errors.email.push('Unexpected error');
  }

  return errors;
};
//------------------------------------------------------------------------------
/**
* @summary Verify email before sending recover password link.
*/
Users.api.checkForgotPasswordFields = function (email) {
  check(email, String);

  // Initialize errors
  const errors = {
    email: [],
  };

  // Checks
  if (!email) {
    errors.email.push('Email is required');
  } else if (!AuxFunctions.validateEmail(email)) {
    errors.email.push('Use a valid email');
  }

  return errors;
};
//------------------------------------------------------------------------------
/**
* @summary Handle errors from loginWithPassword callback.
*/
Users.api.handleForgotPasswordErrors = function (err) {
  // check(err, Object);

  const { error, reason } = err;

  // Initialize errors
  const errors = {
    email: [],
  };

  // Handle known errors firts
  if (error === 403) {
    if (reason === 'User not found') {
      // XXX i18n
      errors.email.push(reason);
    } else if (reason === 'Email is not verified') {
      // XXX i18n
      errors.email.push(reason);
    }
  // Handle unexpected error
  } else {
    // XXX i18n
    errors.email.push('Unexpected error');
  }

  return errors;
};
//------------------------------------------------------------------------------
/**
* @summary Verify password before setting new password.
*/
Users.api.checkResetPasswordFields = function (password, password2) {
  check([password, password2], [String]);

  // Initialize errors
  const errors = {
    password: [],
    password2: [],
  };

  // Checks
  if (!password || !password2) {
    if (!password) {
      errors.password.push('Password is required');
    }
    if (!password2) {
      errors.password2.push('Password is required');
    }
  } else {
    if (password !== password2) {
      errors.password.push('Password does not match');
      errors.password2.push('Password does not match');
    }
  }

  return errors;
};
