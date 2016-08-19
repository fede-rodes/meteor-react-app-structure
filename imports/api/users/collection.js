import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

// =============================================================================
// COLLECTION:
// =============================================================================
// Meteor.users = new Mongo.Collection('users');

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
Meteor.users.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

Meteor.users.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

// =============================================================================
// SCHEMA(S):
// =============================================================================
// SEE: http://themeteorchef.com/snippets/using-the-collection2-package/
//------------------------------------------------------------------------------
Meteor.users.attachSchema(new SimpleSchema({

  profile: {
    type: Object,
  },

  'profile.avatar': {
    type: String,
    allowedValues: [
      'Alien',
      'Batman',
      'Furby',
      'Ninja',
      'Spongebob',
      'Hacker',
      'Surgeon',
      'Man-14',
      'Soldier-3',
      'Burglar',
    ],
    optional: true,
  },

  username: {
    type: String,
    max: 150,
  },

  createdAt: {
    type: Date,
  },

  emails: {
    type: [Object],
    // this must be optional if you also use other login services like facebook,
    // but if you use only accounts-password, then it can be required
    optional: true,
  },

  'emails.$.address': {
    type: String,
    regEx: SimpleSchema.RegEx.Email,
  },

  'emails.$.verified': {
    type: Boolean,
  },

  services: {
    type: Object,
    blackbox: true,
    optional: true,
  },

  roles: {
    type: [String],
    optional: true,
  },

  reviewed: {
    type: [Object],
    defaultValue: [],
  },

  'reviewed.$.reviewType': {
    type: String,
    allowedValues: ['property', 'landlord', 'agent', 'agency'],
  },

  'reviewed.$.typeId': {
    type: String,
    label: 'Refers to the property\'s, landlord\'s, ... id',
  },

  // In order to avoid an 'Exception in setInterval callback' from Meteor
  heartbeat: {
    type: Date,
    optional: true,
  },

}));
