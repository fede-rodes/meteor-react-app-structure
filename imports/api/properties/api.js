import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';
import { _ } from 'meteor/underscore';
import { Properties } from './namespace.js';

//------------------------------------------------------------------------------
/**
* @summary Verify new property fields before inserting doc into database.
*/
Properties.api.checkNewPropertyFields = function (newProperty) {
  check(newProperty, {
    mapboxSelectedOption: {
      id: String,
      placeName: String,
      center: [Number],
    },
    unit: Match.Optional(String),
    propertyType: String,
  });

  // Destructure
  const {
    mapboxSelectedOption,
    // unit,
    propertyType, // 'Apartment', ...
  } = newProperty;

  // Initialize errors
  const errors = {
    address: [],
    unit: [],
    propertyType: [],
  };

  // Checks
  if (!mapboxSelectedOption || !mapboxSelectedOption.id
    || !mapboxSelectedOption.placeName || !mapboxSelectedOption.center) {
    errors.address.push('Address is required');
  }
  if (!propertyType) {
    errors.propertyType.push('Property type is required');
  }

  return errors;
};
