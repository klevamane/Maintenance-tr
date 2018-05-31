import Joi from 'joi';
import db from '../connection';

exports.checkIfEmailAlreadyExist = (req, res, next) => {
  const sql = 'select * from registereduser where email = $1';
  // binding parameter value must be an array else error is thrown
  const bindingParameter = [req.body.email];
  db.query(sql, bindingParameter)
    .then((result) => {
      if (result.rowCount > 0) {
        return res.status(302).json({ message: 'User with the same email already exist' });
      }
      next();
    });
};

exports.checkIfLoginEmailExist = (req, res, next) => {
  const sql = 'select * from registereduser where email = $1';
  // binding parameter value must be an array else error is thrown
  const bindingParameter = [req.body.email];
  db.query(sql, bindingParameter)
    .then((result) => {
      if (result.rowCount === 0) {
        // Indicate invalid email or password so the user won't be sure which is wrong
        return res.status(406).json({ message: 'Invalid email or password' });
      }
      next();
    });
};

exports.checkIfMobileAlreadyExist = (req, res, next) => {
  const sql = 'select * from registereduser where mobile = $1';
  // binding parameter value must be an array else error is thrown
  const bindingParameter = [req.body.mobile];
  db.query(sql, bindingParameter)
    .then((result) => {
      if (result.rowCount > 0) {
        return res.status(302).json({ message: 'The mobile number is in already used by another client' });
      }
      next();
    });
};

// Admin checker
exports.checkIfUserIsAdmin = (req, res, next) => {
  // returns a value with key as count
  const sql = 'select count(*) from registereduser where id = $1 and isadmin = $2';
  // binding parameter value must be an array else error is thrown
  const bindingParameter = [req.decodedUserData.id, true];
  db.query(sql, bindingParameter)
    .then((result) => {
      // check the value retured by the sql statement
      if (result.rows[0].count < 1) {
        return res.status(401).json({ message: 'You are not authorized to access this page' });
      }
      next();
    });
};

exports.checkIfRequestIsApprovable = (req, res, next) => {
  const requestid = parseInt(req.params.requestId, 10);
  const sql = 'select count(*) from request where id = $1 and statusid = $2';
  // binding parameter value must be an array else error is thrown
  const bindingParameter = [requestid, 1];
  db.query(sql, bindingParameter)
    .then((result) => {
      // check the value retured by the sql statement
      if (result.rows[0].count < 1) {
        return res.status(400).json({ message: 'The request has already been approved' });
      }
      next();
    })
    .catch((err => res.status(400).json({ err, message: 'Unable to approve request' })));
};


exports.checkIfRequestIsDisApprovable = (req, res, next) => {
  const requestid = parseInt(req.params.requestId, 10);
  const sql = 'select count(*) from request where id = $1 and (statusid = $2 or statusid = $3)';
  // binding parameter value must be an array else error is thrown
  const bindingParameter = [requestid, 3, 4];
  db.query(sql, bindingParameter)
    .then((result) => {
      // check the value retured by the sql statement
      if (result.rows[0].count > 0) {
        return res.status(400).json({ message: 'You cannot disapprove a request that has already been resolved or disapproved' });
      }
      next();
    })
    .catch((err => res.status(400).json({ err, message: 'Unable to Disapprove the request' })));
};

exports.checkIfRequestIsResolvable = (req, res, next) => {
  const requestid = parseInt(req.params.requestId, 10);
  const sql = 'select count(*) from request where id = $1 and statusid = $2';
  // binding parameter value must be an array else error is thrown
  const bindingParameter = [requestid, 2];
  db.query(sql, bindingParameter)
    .then((result) => {
      // check the value retured by the sql statement
      if (result.rows[0].count < 1) {
        return res.status(400).json({ message: 'You can only resolve a request that is pending' });
      }
      next();
    })
    .catch((err => res.status(400).json({ err, message: 'Unable to resolve the request' })));
};


exports.checkIfRequestExists = (req, res, next) => {
  const requestid = parseInt(req.params.requestId, 10);
  const sql = 'select count(*) from request where id = $1';
  // binding parameter value must be an array else error is thrown
  const bindingParameter = [requestid];
  db.query(sql, bindingParameter)
    .then((result) => {
      // check the value retured by the sql statement
      if (result.rows[0].count < 1) {
        return res.status(404).json({ message: 'The request does not exist' });
      }
      next();
    })
    .catch((err => res.status(400).json({ err, message: 'Bad request' })));
};

// Validation schema to be used as a blueprint in implementing validation
exports.validateRegisterUSerSchema = {
  email: Joi.string().email().required(),
  firstname: Joi.string().max(15).regex(/^[a-zA-Z]+$/).required(),
  lastname: Joi.string().max(15).regex(/^[a-zA-Z]+$/).required(),
  password: Joi.string().min(6).max(15).required(),
  mobile: Joi.string().max(11).regex(/^[0-9]{1}[7-9]{1}[0-1]{1}[1-9]{1}[0-9]{7}/).required()
};

// Validation schema to be used as a blueprint in implementing validation
exports.validateNewRequestSchema = {
  description: Joi.string().max(250).regex(/^[a-zA-Z0-9 ]+$/),
  other: Joi.string().max(30).regex(/^[a-zA-Z0-9 ]+$/),
  brand: Joi.string().max(30).regex(/^[a-zA-Z0-9 ]+$/).required(),
  modelNumber: Joi.string().max(20).regex(/^[a-zA-Z0-9 ]+$/),
  status: Joi.string().max(15).regex(/^[a-zA-Z0-9]+$/),
  fault: Joi.string().max(50).regex(/^[a-zA-Z0-9 ]+$/).required()
};


exports.validateAuthenticateUserSchema = {
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(15).required()
};
