import Users from '../models/user';
import jwt from 'jsonwebtoken';


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
    const newUser = {
      id: Users.length + 1,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: req.body.password,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    Users.push(newUser);
    const position = Users.length - 1;
    const registeredUser = Users[position];
    return res.status(200).json({ message: 'User has been registered', registeredUser });
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
    for (let i = 0; i < Users.length; i += 1) {
      if (Users[i].email === req.email && Users[i].password === req.password) {
        res.status(302).json({ message: 'Login successfull' });
      }
    }
  }
}

export default usercontroller;
