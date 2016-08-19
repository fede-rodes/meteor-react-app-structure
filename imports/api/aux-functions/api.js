import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';
import { _ } from 'meteor/underscore';

/**
* @namespace AuxFunctions
*/
export const AuxFunctions = {};

//------------------------------------------------------------------------------
/**
* @summary Check that the given email is valid.
*/
AuxFunctions.validateEmail = (email) => {
  check(email, String);

  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email); // bool
};
//------------------------------------------------------------------------------
/**
* @summary Get current year.
*/
AuxFunctions.getCurYear = () => {
  // Get current date
  const now = new Date();

  // Return current year
  return now.getFullYear(); // integer
};
//------------------------------------------------------------------------------
/**
* @summary Return month number for the given month name.
* @param {string} monthName - Name of the Month.
*/
AuxFunctions.getMonthNumber = (monthName) => {
  check(monthName, String);

  // List of available months
  const months = [
    { name: 'January', number: '01' },
    { name: 'February', number: '02' },
    { name: 'March', number: '03' },
    { name: 'April', number: '04' },
    { name: 'May', number: '05' },
    { name: 'June', number: '06' },
    { name: 'July', number: '07' },
    { name: 'August', number: '08' },
    { name: 'September', number: '09' },
    { name: 'October', number: '10' },
    { name: 'November', number: '11' },
    { name: 'December', number: '12' },
  ];

  // Check that the given moth is valid
  const index = _.indexOf(_.pluck(months, 'name'), monthName);
  if (index === -1) {
    throw new Meteor.Error('wrong-args', `Incorrect month name at getMonthName: ${monthName}`);
  }

  // Return month number
  return months[index].number;
};
//------------------------------------------------------------------------------
/**
* @summary Is there any errors?
* @param {object} errors - Errors object.
*/
AuxFunctions.hasErrors = (errors) => {
  check(errors, Object);
  let response = false;

  // Go over all errors to see if at least one of them is not empty
  _.each(errors, (err) => {
    if (err.length > 0) {
      response = true;
    }
  });

  return response;
};
//------------------------------------------------------------------------------
/**
* @summary Clean error messages for the given field name.
* @param {string or array} errors - Error(s) array or string.
*/
AuxFunctions.clearErrors = (errors, fieldName) => {
  check(errors, Object);
  check(fieldName, Match.OneOf(String, [String]));

  const errorKeys = _.keys(errors);
  const clearedErrors = {};

  // Remove errors for the given field name
  _.each(errorKeys, (key) => {
    if ((_.isString(fieldName) && key === fieldName)
      || (_.isArray(fieldName) && _.indexOf(fieldName, key) !== -1)) {
      clearedErrors[key] = [];
    } else {
      clearedErrors[key] = errors[key];
    }
  });

  return clearedErrors;
};
//------------------------------------------------------------------------------
/**
* @summary Returns the first (not empty) error message.
*/
AuxFunctions.getFirstError = (errors) => {
  check(errors, Object);

  const errorKeys = _.keys(errors);
  const indexes = [];

  // Get the indexes of those keys that contain non-empty errors
  _.each(errorKeys, (key, index) => {
    if (errors[key].length > 0) {
      indexes.push(index);
    }
  });

  // No errors
  if (indexes.length === 0) {
    return '';
  }

  // Has errors
  const firstIndex = indexes[0];
  const keyFirstError = errorKeys[firstIndex]; // key associated to the first non-empty error
  return errors[keyFirstError][0]; // return first error message
};
//------------------------------------------------------------------------------
/**
* @summary Given a float number [0,5] returns number of stars + half star.
*/
AuxFunctions.getNumStars = (float) => {
  check(float, Number);

  let integer = parseInt(float, 10); // number of full stars
  let half = false; // show half star?
  const decimals = float - integer;

  if (decimals >= 0.25 && decimals < 0.75) {
    half = true;
  } else if (decimals >= 0.75) {
    integer++;
  }

  return { integer, half };
};
//------------------------------------------------------------------------------
/**
* @summary Returns the average value of the array.
*/
AuxFunctions.getAverage = (array) => {
  check(array, [Number]);

  const sum = array.reduce((total, value) => (
    total + value
  ), 0);

  return sum / array.length;
};
//------------------------------------------------------------------------------
/**
* @summary Capitalize string.
*/
AuxFunctions.capitalize = (string) => {
  check(string, String);

  return string.charAt(0).toUpperCase() + string.slice(1);
};
