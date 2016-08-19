import { ReactiveDict } from 'meteor/reactive-dict';

/**
* @summary Handles client side app state across components.
* @namespace LocalState.
*/
export const LocalState = new ReactiveDict('LocalState');
LocalState.api = {};
