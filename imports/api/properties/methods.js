import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';
import { _ } from 'meteor/underscore';
import { AuxFunctions } from '../aux-functions/api.js';
import { Properties } from './namespace.js';
import './api.js'; // Properties.api
import './collection.js'; // Properties.collection
import { Users } from '../users/namespace.js';
import '../users/api.js'; // Users.api
import { Mapbox } from '../mapbox/namespace.js';
import '../mapbox/api.js'; // Mapbox.api

//------------------------------------------------------------------------------
Meteor.methods({ 'Properties.methods.createProperty'(newProperty) {
  // Check arguments
  try {
    check(newProperty, {
      mapboxSelectedOption: {
        id: String,
        placeName: String,
        center: [Number],
      },
      unit: Match.Optional(String),
      propertyType: String,
    });
  } catch (exc) {
    throw new Meteor.Error(exc.sanitizedError.error, exc.message);
  }

  const curUserId = this.userId;

  // Is the current user logged in?
  if (!curUserId) {
    throw new Error('user is not logged in at Properties.methods.createProperty');
  }

  // Is the email account verified?
  if (!Users.api.isAccountVerified(curUserId)) {
    throw new Error('user is not verified at Properties.methods.createProperty');
  }

  const errors = Properties.api.checkNewPropertyFields(newProperty);
  if (AuxFunctions.hasErrors(errors)) {
    throw new Meteor.Error(400, AuxFunctions.getFirstError(errors));
  }

  // Set default value for unit field if not exist
  if (!newProperty.unit) {
    _.extend(newProperty, { unit: '' });
  }

  // Property already exists?
  const { mapboxSelectedOption, unit, propertyType } = newProperty;
  const selector = {
    unit,
    propertyType,
    'mapbox.id': mapboxSelectedOption.id,
  };
  const existingProperty = Properties.collection.findOne(selector);
  if (!!existingProperty) {
    return { propertyId: existingProperty._id };
  }

  // Attach default values (don't set these values client side coz it could be
  // manipulated)
  _.extend(newProperty, {
    createdBy: curUserId,
    createdAt: new Date(),
  });

  // Rename field mapboxSelectedOption to mapbox
  _.extend(newProperty, { mapbox: mapboxSelectedOption });
  _.omit(newProperty, 'mapboxSelectedOption');

  // Insert document into DB
  const propertyId = Properties.collection.insert(newProperty);

  return { propertyId }; // result
} });
//------------------------------------------------------------------------------
Meteor.methods({ 'Properties.methods.updateImagesAndRatings'(propertyId, newReview) {
  // Check arguments
  try {
    check(propertyId, String);
    check(newReview, {
      totalRating: Number,
      images: Match.Optional([{
        _id: String,
        url: String,
        width: Number,
        height: Number,
        publicId: String,
        tag: Match.Optional(String),
        propertyId: String,
        createdBy: String,
        createdAt: Date,
      }]),
    });
  } catch (exc) {
    throw new Meteor.Error(exc.sanitizedError.error, exc.message);
  }

  const curUserId = this.userId;

  // Is the current user logged in?
  if (!curUserId) {
    throw new Error('user is not logged in at Properties.methods.updateImagesAndRatings');
  }

  // Is the email account verified?
  if (!Users.api.isAccountVerified(curUserId)) {
    throw new Error('user is not verified at Properties.methods.updateImagesAndRatings');
  }

  // Get pevious total ratings array
  const projection = { fields: { totalRatings: true } };
  const property = Properties.collection.findOne({ _id: propertyId }, projection);
  const prevTotalRatings = property && property.totalRatings && property.totalRatings.array || [];

  // Get new total ratings array
  const { totalRating, images } = newReview;
  const newTotalRatings = prevTotalRatings.concat(totalRating);

  // Update document in DB
  const modifier = {
    $set: {
      'totalRatings.avg': AuxFunctions.getAverage(newTotalRatings),
    },
    $addToSet: {
      'totalRatings.array': totalRating,
      images: {
        $each: images,
      },
    },
  };
  Properties.collection.update({ _id: propertyId }, modifier);
} });
//------------------------------------------------------------------------------
