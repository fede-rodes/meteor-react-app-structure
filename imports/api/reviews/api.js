import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';
import { _ } from 'meteor/underscore';
import { AuxFunctions } from '../aux-functions/api.js';
import { Reviews } from './namespace.js';

//------------------------------------------------------------------------------
/**
* @summary Verify new review fields before inserting doc into database.
*/
Reviews.api.checkFirstPartReviewFields = function (newReview) {
  console.log('checkFirstPartReviewFields');
  // Check arguments
  try {
    check(newReview, {
      status: String,
      rentedPurchasedStartYear: String,
      rentedPurchasedStartMonth: String,
      rentedPurchasedEndYear: String,
      rentedPurchasedEndMonth: String,
      rentedPurchasedYearOnly: String,
      rentedPurchasedDateType: String,
      inspectedDay: String,
      inspectedMonth: String,
      inspectedYear: String,
      managerType: String,
      managerAgencyName: String,
      managerAgentName: String,
      managerLandlordName: String,
    });
  } catch (exc) {
    throw new Meteor.Error(exc.sanitizedError.error, exc.message);
  }

  // Destructure
  const {
    status, // 'rented', 'purchase', 'inspected'
    rentedPurchasedStartYear,
    rentedPurchasedStartMonth,
    rentedPurchasedEndYear,
    rentedPurchasedEndMonth,
    rentedPurchasedYearOnly,
    rentedPurchasedDateType, // 'year-month', 'year-only'
    inspectedMonth,
    inspectedYear,
    managerType, // 'agent-agency', 'landlord'
    managerAgencyName,
    managerAgentName,
    managerLandlordName,
  } = newReview;

  // Initialize errors
  const errors = {
    status: [],
    rentedPurchasedDateType: [],
    dateRentedPurchasedYearMonth: [],
    dateRentedPurchasedYearOnly: [],
    dateInspectedYearMonth: [],
    managerType: [],
    managerAgencyAgent: [],
    managerLandlord: [],
  };

  // Checks
  if (!status) {
    errors.status.push('Status is required');
  }
  if (status === 'rented' || status === 'purchased') {
    if (!rentedPurchasedDateType) {
      errors.rentedPurchasedDateType.push('Date type is required');
    }
    if (rentedPurchasedDateType === 'year-month') {
      if (!rentedPurchasedStartYear || !rentedPurchasedStartMonth
        || !rentedPurchasedEndYear || !rentedPurchasedEndMonth) {
        errors.dateRentedPurchasedYearMonth.push('Date is required');
      } else {
        // If all date are set, check that the given value is valid
        const startMonthNumber = AuxFunctions.getMonthNumber(rentedPurchasedStartMonth);
        const endMonthNumber = AuxFunctions.getMonthNumber(rentedPurchasedEndMonth);

        if (rentedPurchasedStartYear > rentedPurchasedEndYear
          || ((rentedPurchasedStartYear === rentedPurchasedEndYear)
          && (startMonthNumber > endMonthNumber))) {
          errors.dateRentedPurchasedYearMonth.push('Start date must be less or equal than end date');
        }
      }
    } else if (rentedPurchasedDateType === 'year-only' && !rentedPurchasedYearOnly) {
      errors.dateRentedPurchasedYearOnly.push('Date is required');
    }
  } else if (status === 'inspected' && (!inspectedMonth || !inspectedYear)) {
    errors.dateInspectedYearMonth.push('Date is required');
  }
  if (!managerType) {
    errors.managerType.push('Manager type is required');
  }
  if (managerType === 'agent-agency' && (!managerAgencyName || !managerAgentName)) {
    errors.managerAgencyAgent.push('Both Agency and Agent names are required');
  }
  if (managerType === 'landlord' && !managerLandlordName) {
    errors.managerLandlord.push('Landlord name is required');
  }

  return errors;
};
//------------------------------------------------------------------------------
/**
* @summary Verify new review fields before inserting doc into database.
*/
Reviews.api.checkSecondPartReviewFields = function (newReview) {
  check(newReview, {
    totalRating: Number,
    ratings: Object,
    goodFeatures: Object,
    badFeatures: Object,
    reviewText: String,
    rentPerWeek: String,
    honestReview: Boolean,
    images: [Object],
  });

  // Destructure
  const {
    // totalRating,
    ratings,
    // goodFeatures,
    // badFeatures,
    reviewText,
    rentPerWeek,
    honestReview,
    images,
  } = newReview;

  // Initialize errors
  const errors = {
    ratings: [],
    reviewText: [],
    rentPerWeek: [],
    honestReview: [],
    images: [],
  };

  // Checks
  if (!ratings) {
    errors.ratings.push('Please, complete all the ratings');
  } else {
    const values = _.values(ratings);
    const index = _.indexOf(values, 0);
    if (index !== -1) {
      errors.ratings.push('Please, complete all the ratings');
    }
  }
  if (!reviewText) {
    errors.reviewText.push('Review is required');
  }
  if (!rentPerWeek) {
    errors.rentPerWeek.push('Rent per week is required');
  }
  if (!honestReview) {
    errors.honestReview.push('This field is required');
  }
  if (images) {
    if (images.length > 10) {
      errors.images.push('You can upload up to 10 images');
    }
    const tags = _.compact(_.pluck(images, 'tag'));
    if (tags.length < images.length) {
      errors.images.push('All tags must be selected');
    }
  }

  return errors;
};
//------------------------------------------------------------------------------
