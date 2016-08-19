import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { LocalState } from '../../api/local-state/client/namespace.js';
import '../../api/local-state/client/api.js'; // LocalState.api

console.log('[autorun] loaded');

/**
* @summary Runs eveytime LocalState changes to check that localState value are
* set correctly.
*/
/* Tracker.autorun(() => {
  const mapbox = LocalState.get('addProperty.mapbox');
  const { id, placeName, center } = mapbox;
  console.log(`mapbox --> id: ${id}, placeName: ${placeName}, center: ${center}`);

  const unit = LocalState.get('addProperty.unit');
  console.log(`unit: ${unit}`);

  const propertyType = LocalState.get('addProperty.propertyType');
  console.log(`propertyType: ${propertyType}`);

  const status = LocalState.get('addProperty.status');
  console.log(`status: ${status}`);

  const startYear = LocalState.get('addProperty.rentedPurchased.startYear');
  console.log(`startYear: ${startYear}`);

  const startMonth = LocalState.get('addProperty.rentedPurchased.startMonth');
  console.log(`startMonth: ${startMonth}`);

  const endYear = LocalState.get('addProperty.rentedPurchased.endYear');
  console.log(`endYear: ${endYear}`);

  const endMonth = LocalState.get('addProperty.rentedPurchased.endMonth');
  console.log(`endMonth: ${endMonth}`);

  const yearOnly = LocalState.get('addProperty.rentedPurchased.yearOnly');
  console.log(`yearOnly: ${yearOnly}`);

  const dateType = LocalState.get('addProperty.rentedPurchased.dateType');
  console.log(`dateType: ${dateType}`);

  const inspectedDay = LocalState.get('addProperty.inspected.day');
  console.log(`inspectedDay: ${inspectedDay}`);

  const inspectedMonth = LocalState.get('addProperty.inspected.month');
  console.log(`inspectedMonth: ${inspectedMonth}`);

  const inspectedYear = LocalState.get('addProperty.inspected.year');
  console.log(`inspectedYear: ${inspectedYear}`);

  const managerName = LocalState.get('addProperty.managerName');
  console.log(`managerName: ${managerName}`);

  const managerType = LocalState.get('addProperty.managerType');
  console.log(`managerType: ${managerType}`);

  const reviewLandlord = LocalState.get('addProperty.reviewLandlord');
  console.log(`reviewLandlord: ${reviewLandlord}`);

  const connectedTo = LocalState.get('addProperty.connectedTo');
  console.log(`connectedTo: ${connectedTo}`);
}); */
