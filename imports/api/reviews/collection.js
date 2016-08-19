import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Reviews } from './namespace';

// =============================================================================
// COLLECTION:
// =============================================================================
Reviews.collection = new Mongo.Collection('Reviews');

// =============================================================================
// ALLOW & DENY RULES:
// =============================================================================
/*
SOURCE: https://themeteorchef.com/recipes/building-a-user-admin/
To save face, we can “lock down” all of our rules when we define our collection
to prevent any client-side database operations from taking place. This means
that when we interact with the database, we’re required to do it from the server
(a trusted environment) via methods.
SOURCE: http://docs.meteor.com/#/full/deny
When a client tries to write to a collection, the Meteor server first checks the
collection's deny rules. If none of them return true then it checks the
collection's allow rules. Meteor allows the write only if no deny rules return
true and at least one allow rule returns true.
*/
Reviews.collection.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

Reviews.collection.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

// =============================================================================
// SCHEMA(S):
// =============================================================================
// SEE: http://themeteorchef.com/snippets/using-the-collection2-package/
//------------------------------------------------------------------------------
const badFeatures = [
  'mouldIssues',
  'maintenanceIssues',
  'poorStorage',
  'trafficRailwayNoise',
  'pests',
  'oldPipingWiring',
  'noisyNeighbours',
  'noInternetConnection',
];
const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

Reviews.collection.attachSchema(new SimpleSchema({

  propertyId: {
    type: String,
  },

  createdBy: {
    type: String,
  },

  createdAt: {
    type: Date,
  },

  status: {
    type: String,
    allowedValues: [
      'purchased',
      'rented',
      'inspected',
    ],
  },

  rentedPurchasedStartYear: {
    type: String,
    optional: true,
  },

  rentedPurchasedStartMonth: {
    type: String,
    allowedValues: months,
    optional: true,
  },

  rentedPurchasedEndYear: {
    type: String,
    optional: true,
  },

  rentedPurchasedEndMonth: {
    type: String,
    allowedValues: months,
    optional: true,
  },

  rentedPurchasedYearOnly: {
    type: String,
    optional: true,
  },

  rentedPurchasedDateType: {
    type: String,
    allowedValues: ['year-month', 'year-only'],
    optional: true,
  },

  inspectedMonth: {
    type: String,
    optional: true,
  },

  inspectedYear: {
    type: String,
    optional: true,
  },

  managerType: {
    type: String,
    allowedValues: ['agent-agency', 'landlord'],
  },

  managerAgencyName: {
    type: String,
    optional: true,
  },

  managerAgentName: {
    type: String,
    optional: true,
  },

  managerLandlordName: {
    type: String,
    optional: true,
  },

  totalRating: {
    type: Number,
    decimal: true,
    optional: true,
  },

  ratings: {
    type: Object,
    blackbox: true,
    optional: true,
  },

  goodFeatures: {
    type: Object,
    blackbox: true,
    optional: true,
  },

  badFeatures: {
    type: Object,
    blackbox: true,
    optional: true,
  },

  reviewText: {
    type: String,
    max: 1000,
    optional: true,
  },

  images: {
    type: [String],
    maxCount: 10,
    optional: true,
  },

  rentPerWeek: {
    type: String,
    max: 10,
    optional: true,
  },

  done: {
    type: Boolean,
    optional: true,
  },

}));
