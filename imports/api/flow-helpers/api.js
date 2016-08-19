import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';

const pathFor = (path, params) => {
  const query = params && params.query ? FlowRouter._qs.parse( params.query ) : {};
  return FlowRouter.path(path, params, query);
};

const urlFor = (path, params) => (
  Meteor.absoluteUrl(pathFor(path, params))
);

const currentRoute = (route) => {
  FlowRouter.watchPathChange();
  return FlowRouter.current().route.name === route ? 'active' : '';
};

/**
* @namespace FlowHelpers
*/
export const FlowHelpers = {
  pathFor,
  urlFor,
  currentRoute,
};
