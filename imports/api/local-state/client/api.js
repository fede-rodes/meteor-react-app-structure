import { check } from 'meteor/check';
import { LocalState } from './namespace';

//------------------------------------------------------------------------------
/**
* @summary Initialize local state for the given field name.
*/
LocalState.api.initField = function (fieldName) {
  console.log(`[local-state] init ${fieldName}`);

  switch (fieldName) {
    case 'signup':
      LocalState.set('signup.canSubmit', true);
      LocalState.set('signup.username', '');
      LocalState.set('signup.email', '');
      LocalState.set('signup.password', '');
      LocalState.set('signup.password2', '');
      LocalState.set('signup.selectedAvatar', '');
      LocalState.set('signup.terms', false);
      LocalState.set('signup.errors', {
        username: [],
        email: [],
        password: [],
        password2: [],
        terms: [],
      });
      break;

    default:
      break;
  }
};
//------------------------------------------------------------------------------
/**
* @summary Initializes local state for all fields.
*/
LocalState.api.init = function () {
  console.log('[local-state] init');

  LocalState.api.initField('signup');
};
