import { Meteor } from 'meteor/meteor';
import { LocalState } from '../../api/local-state/client/namespace.js';
import '../../api/local-state/client/api.js'; // LocalState.api
import '../../autorun/client/index.js';
import { $ } from 'meteor/jquery';
import 'meteor/lepozepo:cloudinary';

Meteor.startup(() => {
  console.log('[client] startup');

  // Setup default local state
  LocalState.api.init();

  const settings = Meteor.settings.public.cloudinary;
  const { cloudName } = settings;

  $.cloudinary.config({
    cloud_name: cloudName,
  });
});
