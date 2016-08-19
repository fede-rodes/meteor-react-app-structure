import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { _ } from 'meteor/underscore';
import { Properties } from '../namespace';
import '../collection.js'; // Properties.collection

//------------------------------------------------------------------------------
Meteor.publish('Properties.publications.propertyData', function (propertyId) {
  check(propertyId, String);

  return Properties.collection.find({ _id: propertyId }, { limit: 1 });
});
//------------------------------------------------------------------------------
Meteor.publish('Properties.publications.getPropertiesLocation', function (propertyIds) {
  check(propertyIds, [String]);

  const selector = {
    _id: {
      $in: propertyIds,
    },
  };
  const projection = {
    mapbox: true,
  };
  return Properties.collection.find(selector, projection);
});
//------------------------------------------------------------------------------
/**
* @see {@link https://themeteorchef.com/snippets/simple-search/}
* @see {@link https://www.okgrow.com/posts/guide-to-full-text-search-in-meteor}
*/
Meteor.publish('Properties.publications.searchProperties', function (params) {
  check(params, {
    searchQuery: String,
    limit: Number,
    sort: Object,
  });

  const MAX_LIMIT = 400;
  const { searchQuery, limit, sort } = params;

  const query = {
    'totalRatings.avg': {
      $gt: 0,
    },
  };
  const options = {
    sort,
    limit: Math.min(limit, MAX_LIMIT), // 10,
  };

  // If no searchQuery is provided return all the properties
  if (searchQuery.length === 0) {
    return Properties.collection.find(query, options);
  }

  // Else return matched valued
  _.extend(query, {
    'mapbox.placeName': new RegExp(searchQuery, 'i'),
  });

  return Properties.collection.find(query, options);
});
//------------------------------------------------------------------------------
