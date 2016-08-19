import { Meteor } from 'meteor/meteor';
import { Cloudinary } from 'meteor/lepozepo:cloudinary';
import { Properties } from '../../api/properties/namespace.js';
import '../../api/properties/collection.js'; // Properties.collection

Meteor.startup(function () {
  console.log('[cloudinary] init');

  const settings = Meteor.settings.cloudinary;
  const { cloudName, apiKey, apiSecret } = settings;

  Cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
  });
});
