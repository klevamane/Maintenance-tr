import winston from 'winston';
import jwt from 'jsonwebtoken';

exports.checkAuthentication = (req, res, next) => {
  try {
    // Access the token from header and excluding the Bearer and space
    // by splitting the array
    const token = req.headers.authorization.split(' ')[1];
    // jwt.verify throuws and error if it fails
    // which will be sent to the catch block
    const decoded = jwt.verify(token, 'secreteKey');
    // const decodededtoken = jwt.decode(token);
    // Add a new property to the request body
    winston.info(`Token data ${decoded.payload.id}`);
    req.decodedUserData = decoded.payload;
    next();
  } catch (error) {
    winston.info(error);
    return res.status(401).json({
      error: 'Invalid email or password'
    });
  }
};

