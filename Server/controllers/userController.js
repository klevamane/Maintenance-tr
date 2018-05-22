import jwt from 'jsonwebtoken';
import winston from 'winston';
import bcrypt from 'bcrypt';
import Users from '../models/user';


/**
* @class usercontroller
* @classdesc creates a usercontroller class with methods
*/
class usercontroller {
  /**
     * Register a new user on the platform
     * @static
     * @description create a new user
     * @param  {object} req gets values passed to the api
     * @param  {object} res sends result as output
     * @returns {object} Success message with the user created or error message
     * @memberOf
     */
  static registerUser(req, res) {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
      if (err) {
        return res.status(500).json({ error: err });
      }
      const newUser = {
        id: Users.length + 1,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: hash,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };
      Users.push(newUser);
      const position = Users.length - 1;
      const registeredUser = Users[position];
      return res.status(201).json({ message: 'User has been registered', registeredUser });
    });
  }

  /**
* @static
* @description A registered user will be authenticated to gain access to the application
* @param  {object} req gets values passed to the api
* @param  {object} res sends result as output
* @returns {object} returns 202 status code and valid user message is  if successful, else 401
* @memberOf
*/
  static authenticateUser(req, res) {
    let status;
    let positionOfUser;
    for (let i = 0; i < Users.length; i += 1) {
      if (Users[i].email === req.body.email) {
        status = 1;
        positionOfUser = i;
        break;
      }
    }
    if (status !== 1) {
      return res.status(401).json({ message: 'Invalid email or password outside' });
    }
    winston.info(`Status is equal to ${status}`);
    bcrypt.compare(req.body.password, Users[positionOfUser].password, (err, result) => {
      if (result) {
        // Ensure to put the secretekey in your environment variable
        const token = jwt.sign({ id: Users[positionOfUser].id }, 'secreteKey', { expiresIn: 60 * 2 });
        return res.status(202).json({
          message: 'User has been authenticated',
          token,
        //   user: Users[positionOfUser]
        });
      }
      return res.status(401).json({ message: 'Invalid email or password Inside' });
    });
  //  }
  //  return res.status(401).json({ message: 'Invalid email or password outside' });
  }
}
export default usercontroller;
