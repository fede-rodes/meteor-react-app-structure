import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';
import { _ } from 'meteor/underscore';
import { AuxFunctions } from '../aux-functions/api.js';
import { Users } from './namespace.js';
import './api.js'; // Users.api
import { Reviews } from '../reviews/namespace.js';
import '../reviews/collection.js'; // Reviews.collection

//------------------------------------------------------------------------------
Meteor.methods({ 'Users.methods.addReviewToUser'(reviewType, typeId) {
  // Check arguments
  try {
    check([reviewType, typeId], [String]);
  } catch (exc) {
    throw new Meteor.Error(exc.sanitizedError.error, exc.message);
  }

  const curUserId = this.userId;

  // Is the current user logged in?
  if (!curUserId) {
    throw new Error('user is not logged in at Users.methods.addReviewToUser');
  }

  // Is the email account verified?
  if (!Users.api.isAccountVerified(curUserId)) {
    throw new Error('user is not verified at Users.methods.addReviewToUser');
  }

  // Check review existance
  /* if (Reviews.collection.findOne({ _id: reviewId, createdBy: curUserId })) {
    throw new Error('review does not exist at Users.methods.addReviewToUser');
  } */

  // Insert document into DB
  Meteor.users.update({ _id: curUserId }, { $addToSet: { reviewed: { reviewType, typeId } } });
} });
//------------------------------------------------------------------------------
