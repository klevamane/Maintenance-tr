import Joi from 'joi';
import User from '../models/user';


exports.checkIfEmailAlreadyExist = (req, res, next) => {
  for (let i = 0; i < User.length; i += 1) {
    if (User[i].email === req.body.email) {
      return res.status(302).json({ message: 'User with the same email already exist' });
    }
  }
  next();
};

// Validation schema to be used as a blueprint in implementing validation
exports.validateRegisterUSerSchema = {
  email: Joi.string().email().required(),
  firstname: Joi.string().max(15).regex(/^[a-zA-Z]+$/).required(),
  lastname: Joi.string().max(15).regex(/^[a-zA-Z]+$/).required(),
  password: Joi.string().min(6).max(15).required(),
  mobile: Joi.string().max(11).regex(/^[0-9]{1}[7-9]{1}[0-1]{1}[1-9]{1}[0-9]{7}/).required(),
};
