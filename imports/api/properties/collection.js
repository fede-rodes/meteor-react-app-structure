import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Properties } from './namespace';

// =============================================================================
// COLLECTION:
// =============================================================================
Properties.collection = new Mongo.Collection('Properties');

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
Properties.collection.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

Properties.collection.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

// =============================================================================
// SCHEMA(S):
// =============================================================================
// SEE: http://themeteorchef.com/snippets/using-the-collection2-package/
//------------------------------------------------------------------------------
Properties.collection.attachSchema(new SimpleSchema({

  createdBy: {
    type: String,
  },

  createdAt: {
    type: Date,
  },

  mapbox: {
    type: Object,
  },

  'mapbox.id': {
    type: String,
  },

  'mapbox.placeName': {
    type: String,
    index: 'text',
  },

  // TODO: use geo coordinates
  'mapbox.center': {
    type: [Number],
    decimal: true,
    minCount: 2,
    maxCount: 2,
  },

  propertyType: {
    type: String,
    allowedValues: [
      'Apartment',
      'House',
      'Bungilow',
      'Unit',
      'Campervan',
    ],
  },

  unit: {
    type: String,
    defaultValue: '',
  },

  images: {
    type: [Object],
    label: 'Array containing all image from all reviews',
    blackbox: true,
    defaultValue: [],
  },

  totalRatings: {
    type: Object,
  },

  'totalRatings.avg': {
    type: Number,
    decimal: true,
    defaultValue: 0,
  },

  'totalRatings.array': {
    type: [Number],
    decimal: true,
    label: 'Array containing total ratings from all reviews',
    defaultValue: [],
  },

}));
