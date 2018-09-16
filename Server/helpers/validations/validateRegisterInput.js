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
  data.mobile = isEmpty(data.mobile) === true ? '' : data.mobile;
  data.password2 = isEmpty(data.password2) === true ? '' : data.password2;

  if (!Validator.isAlpha(data.lastname)) {
    errors.lastname = 'Lastname must be only alphabets';
  }
  if (Validator.isEmpty(data.lastname) || !Validator.isLength(data.lastname, { min: 2, max: 30 })) {
    errors.lastname = 'Lastname must be between 2 and 30 characters';
  }

  if (isEmpty(data.firstname) ||
  !Validator.isLength(data.firstname, { min: 2, max: 30 })) {
    errors.firstname = 'Firstname must be between 2 and 30 characters';
  }

  if (!Validator.isAlpha(data.firstname)) {
    errors.firstname = 'Firstname must be only alphabets';
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = 'The Email is invalid';
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'The Password field is required';
  }

  if (!Validator.isLength(data.password, { min: 8, max: 30 })) {
    errors.password = 'Password must be between 8 and 30 characters';
  }

  if (!Validator.isMobilePhone(data.mobile, 'en-NG')) {
    errors.mobile = 'Mobile number must be of nigerian format of 11 digits';
  }

  if (isEmpty(data.password2)) {
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
