import Joi from 'joi';
import { validateRegisterUSerSchema, validateAuthenticateUserSchema } from './helpers';

export const validateCreateUser = (req, res, next) => {
  // Use schema blue print to validate req variables
  const { error, value } = Joi.validate(req.body, validateRegisterUSerSchema);
  if (error) {
    switch (error.details[0].context.key) {
      case 'email':
        res.status(400).json({ error: 'You must provide a valid email address' }); break;
      case 'password':
        res.status(400).json({ error: 'Password must be between 6-15 characters' }); break;
      case 'mobile':
        res.status(400).json({ error: 'Mobile number must be in Nigerian Format' });break;
      case 'lastname':
        res.status(400).json({ error: 'lastname must contain only alphabets' }); break;
      case 'firstname':
        res.status(400).json({ error: 'firstname must contain only alphabets' }); break;
      default:
        res.status(400).send({ error: 'Invalid User details' });
    }
  } else {
    next();
  }
};


export const validateAuthenticateUser = (req, res, next) => {
  // Use schema (validateAuthenticateUserSchema) blue print to validate req object variables
  const { error, value } = Joi.validate(req.body, validateAuthenticateUserSchema);
  if (error) {
    switch (error.details[0].context.key) {
      case 'email':
        res.status(400).json({ error: 'You must provide a valid email address' });
        break;
      case 'password':
        res.status(400).json({ error: 'Password must be between 6-15 characters' });
        break;
      default:
        res.status(400).send({ error: 'Invalid User details' });
    }
  } else {
    next();
  }
};
