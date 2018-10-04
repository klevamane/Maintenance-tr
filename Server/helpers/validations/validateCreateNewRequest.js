import Validator from 'validator';
import isEmpty from '../isEmpty';

const validateCreateNewRequest = (data) => {
  const errors = {};

  // Data.name may be empty but may not be a string
  // we need to ensure that if its empty (using our custom IsEmpty method to check)
  // we make it an empty string which can now be checked by the validator.isEmpty method
  // The reason being that validator.isEmpty can only check for empty string not empty object
  data.modelnumber = isEmpty(data.modelnumber) === true ? '' : data.modelnumber;
  data.brand = isEmpty(data.brand) === true ? '' : data.brand;
  data.fault = isEmpty(data.fault) === true ? '' : data.fault;
  data.description = isEmpty(data.description) === true ? '' : data.description;
  data.other = isEmpty(data.other) === true ? '' : data.other;

  if (Validator.isEmpty(data.modelnumber) || !Validator.isLength(data.modelnumber, { min: 2, max: 30 })) {
    errors.modelnumber = 'Model number is required';
  }

  if (Validator.isEmpty(data.brand) ||
  !Validator.isLength(data.brand, { min: 2, max: 30 })) {
    errors.brand = 'Brand is required';
  }

  if (Validator.isEmpty(data.description)) {
    errors.description = 'The description field is required';
  }
  
  if (!Validator.isLength(data.description, { max: 250 })) {
    errors.description = 'Description cannot be more than 250 characters including spaces';
  }

  if (Validator.isEmpty(data.modelnumber)) {
    errors.modelnumber = 'The model number is required';
  }

  if (Validator.isEmpty(data.fault)) {
    errors.fault = 'The Fault field is required';
  }
  if (Validator.isEmpty(data.other)) {
    errors.other = 'The type of request is required';
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};

export default validateCreateNewRequest;
