import Validator from 'validator';
import isEmpty from '../isEmpty';

const validateNewRequest = (data) => {
  const errors = {};

  // Data.name may be empty but may not be a string
  // we need to ensure that if its empty (using our custom IsEmpty method to check)
  // we make it an empty string which can now be checked by the validator.isEmpty method
  // The reason being that validator.isEmpty can only check for empty string not empty object
  data.fault = isEmpty(data.fault) === true ? '' : data.fault;
  data.brand = isEmpty(data.brand) === true ? '' : data.brand;
  data.description = isEmpty(data.description) === true ? '' : data.description;
  data.modelNumber = isEmpty(data.modelNumber) === true ? '' : data.modelNumber;

  if (Validator.isEmpty(data.fault)) {
    errors.fault = 'The Fault field is required';
  }

  if (Validator.isEmpty(data.brand)) {
    errors.brand = 'The Brand field is required';
  }

  if (Validator.isEmpty(data.description)) {
    errors.description = 'The Description field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

export default validateNewRequest;
