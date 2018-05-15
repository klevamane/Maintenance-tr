import User from '../models/user';

exports.checkIfEmailAlreadyExist = (req, res, next) => {
  for (let i = 0; i < User.length - 1; i += 1) {
    if (User[i].email === req.body.email) {
      return res.status(302).json({ message: 'User with the same email already exist' });
    }
  }
  next();
};
