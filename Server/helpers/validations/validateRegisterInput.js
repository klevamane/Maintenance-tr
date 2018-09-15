import Validator from 'validator';
import isEmpty from '../isEmpty';

const validateRegisterInput = (data) => {
  const errors = {};

  // Data.name may be empty but may not be a string
  // we need to ensure that if its empty (using our custom IsEmpty method to check)
  // we make it an empty string which can now be checked by the validator.isEmpty method
  // The reason being that validator.isEmpty can only check for empty string not empty object
  data.lastname = isEmpty(data.lastname) === true ? '' : data.lastname;
  data.firstname = isEmpty(data.firstname) === true ? '' : data.firstname;
  data.email = isEmpty(data.email) === true ? '' : data.email;
  data.password = isEmpty(data.password) === true ? '' : data.password;
  data.password2 = isEmpty(data.password2) === true ? '' : data.password2;

  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = 'Name must be between 2 and 30 characters';
  }

  if (Validator.isEmpty(data.firstname)) {
    errors.firstname = 'Firstname is required';
  }

  if (Validator.isEmpty(data.lastname)) {
    errors.lastname = 'Lastname is required';
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'The Password field is required';
  }

  if (!Validator.isLength(data.password, { min: 8, max: 30 })) {
    errors.password = 'Password must be between 8 and 30 characters';
  }

  if (Validator.isEmpty(data.password2)) {
    // errors.password2confirm = 'Confirm password field is required';
    errors.password2 = 'Confirm password field is required';
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = 'Passwords dont match';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

export default validateRegisterInput;
