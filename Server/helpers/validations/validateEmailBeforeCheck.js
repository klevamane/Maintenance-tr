import Validator from 'validator';
import isEmpty from '../isEmpty';

const validateEmailBeforeCheck = (data) => {
  const errors = {};

  // Data.name may be empty but may not be a string
  // we need to ensure that if its empty (using our custom IsEmpty method to check)
  // we make it an empty string which can now be checked by the validator.isEmpty method
  // The reason being that validator.isEmpty can only check for empty string not empty object
  data.email = isEmpty(data.email) === true ? '' : data.email;
  if (!Validator.isEmail(data.email) || isEmpty(data.email)) {
    errors.email = 'Email is invalid';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

export default validateEmailBeforeCheck;
