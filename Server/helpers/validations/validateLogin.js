import Validator from 'validator';
import isEmpty from '../isEmpty';

const validateLogin = (data) => {
  const errors = {};

  // Data.name may be empty but may not be a string
  // we need to ensure that if its empty (using our custom IsEmpty method to check)
  // we make it an empty string which can now be checked by the validator.isEmpty method
  // The reason being that validator.isEmpty can only check for empty string not empty object
  data.email = isEmpty(data.email) === true ? '' : data.email;
  data.password = isEmpty(data.password) === true ? '' : data.password;

  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'The Password field is required';
  }

  if (!Validator.isLength(data.password, { min: 8, max: 30 })) {
    errors.password = 'Password must be between 8 and 30 characters';
  }


  return {
    errors,
    isValid: isEmpty(errors)
  };
};

export default validateLogin;
