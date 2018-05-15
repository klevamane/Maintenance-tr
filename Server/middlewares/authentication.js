import jwt from 'jsonwebtoken';
import winston from 'winston';

exports.checkAuthentication = (req, res, next) => {
  try {
    // Access the token from header and excluding the Bearer and space
    // by splitting the array
    const token = req.headers.authorization.split(' ')[1];
    winston.info(token);
    const decoded = jwt.verify(token, 'secreteKey');
    // Add a new property to the request body
    req.decodedUserData = decoded;
    winston.info('User authenticated');
    winston.info(decoded);
    next();
  } catch (error) {
    return res.status(401).json({
      message: 'Invalid email or password; token is missing'
    });
  }
};

