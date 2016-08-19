import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Reviews } from '../namespace';
import '../collection.js'; // Reviews.collection

//------------------------------------------------------------------------------
Meteor.publish('Reviews.publications.propertyReviews', function (propertyId) {
  check(propertyId, String);

  return Reviews.collection.find({ propertyId, done: true });
});
//------------------------------------------------------------------------------
Meteor.publish('Reviews.publications.getLatest', function (numReviews) {
  check(numReviews, Number);

  const MAX_LIMIT = 20;
  const options = {
    limit: Math.min(numReviews, MAX_LIMIT),
    sort: {
      createdAt: -1,
    },
  };

  return Reviews.collection.find({ done: true }, options);
});
//------------------------------------------------------------------------------
