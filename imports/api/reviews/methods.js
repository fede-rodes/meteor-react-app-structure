import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';
import { _ } from 'meteor/underscore';
import { AuxFunctions } from '../aux-functions/api.js';
import { Reviews } from './namespace.js';
import './api.js'; // Reviews.api
import './collection.js'; // Reviews.collection
import { Users } from '../users/namespace.js';
import '../users/api.js'; // Users.api

//------------------------------------------------------------------------------
Meteor.methods({ 'Reviews.methods.addFirstPartReview'(propertyId, newReview) {
  // Check arguments
  try {
    check(propertyId, String);
    check(newReview, {
      status: String,
      rentedPurchasedStartYear: String,
      rentedPurchasedStartMonth: String,
      rentedPurchasedEndYear: String,
      rentedPurchasedEndMonth: String,
      rentedPurchasedYearOnly: String,
      rentedPurchasedDateType: String,
      inspectedDay: String,
      inspectedMonth: String,
      inspectedYear: String,
      managerType: String,
      managerAgencyName: String,
      managerAgentName: String,
      managerLandlordName: String,
    });
  } catch (exc) {
    throw new Meteor.Error(exc.sanitizedError.error, exc.message);
  }

  const curUserId = this.userId;

  // Is the current user logged in?
  if (!curUserId) {
    throw new Error(403, 'user is not logged in at Reviews.methods.addFirstPartReview');
  }

  // Is the email account verified?
  if (!Users.api.isAccountVerified(curUserId)) {
    throw new Error(403, 'user is not verified at Reviews.methods.addFirstPartReview');
  }

  const errors = Reviews.api.checkFirstPartReviewFields(newReview);
  if (AuxFunctions.hasErrors(errors)) {
    throw new Meteor.Error(400, AuxFunctions.getFirstError(errors));
  }

  // User already reviewed this property?
  if (!!Reviews.collection.findOne({ propertyId, createdBy: curUserId, done: true })) {
    throw new Meteor.Error(409, 'You already reviewed this property!');
  }

  // Attach default values (don't set these values client side coz it could be
  // manipulated)
  _.extend(newReview, {
    propertyId,
    createdBy: curUserId,
    createdAt: new Date(),
  });

  // Remove previews (partial) reviews if any
  Reviews.collection.remove({ propertyId, createdBy: curUserId });

  // Insert new review into DB
  Reviews.collection.insert(newReview);
} });
//------------------------------------------------------------------------------
Meteor.methods({ 'Reviews.methods.addSecondPartReview'(propertyId, newReview) {
  // Check arguments
  try {
    check(propertyId, String);
    check(newReview, {
      totalRating: Number,
      ratings: Object,
      goodFeatures: Object,
      badFeatures: Object,
      reviewText: String,
      rentPerWeek: String,
      honestReview: Boolean,
      images: Match.Optional([Object]),
    });
  } catch (exc) {
    throw new Meteor.Error(exc.sanitizedError.error, exc.message);
  }

  const curUserId = this.userId;

  // Is the current user logged in?
  if (!curUserId) {
    throw new Error('user is not logged in at Reviews.methods.addSecondPartReview');
  }

  // Is the email account verified?
  if (!Users.api.isAccountVerified(curUserId)) {
    throw new Error('user is not verified at Reviews.methods.addSecondPartReview');
  }

  // Does first part review exist?
  const firstPartReview = Reviews.collection.findOne({ propertyId, createdBy: curUserId }, { fields: { '_id': true } });
  if (!firstPartReview) {
    throw new Meteor.Error(409, 'First part review does not exist at Reviews.methods.addSecondPartReview');
  }

  const errors = Reviews.api.checkSecondPartReviewFields(newReview);
  if (AuxFunctions.hasErrors(errors)) {
    throw new Error(AuxFunctions.getFirstError(errors));
  }

  // This field doesn't need to be stored
  _.omit(newReview, 'honestReview');

  // Keep only image ids and set review to 'done'
  const { images } = newReview;
  _.omit(newReview, 'images');
  _.extend(newReview, {
    images: _.pluck(images, '_id'),
    done: true,
  });

  // Insert document into DB
  Reviews.collection.update({ propertyId, createdBy: curUserId }, { $set: newReview });
} });
//------------------------------------------------------------------------------
