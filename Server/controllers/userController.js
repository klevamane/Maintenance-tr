import jwt from 'jsonwebtoken';
import winston from 'winston';
import bcrypt from 'bcrypt';
import Users from '../models/user';
import db from '../connection';


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
      db.connect()
        .then(() => {
          const sql = 'INSERT INTO registereduser(firstname, lastname, email, mobile, password, role) VALUES ( $1, $2, $3, $4, $5, $6)';
          const bindingParamaters =
            [req.body.firstname, req.body.lastname, req.body.email, req.body.mobile, req.body.password, true];
          // continue the chain by returning result to the next then block
          return db.query(sql, bindingParamaters);
        })
        .then((user) => {
          const numberofCreatedUsers = user.rowCount;
          return res.status(201).json({ message: 'User has been registered', numberofCreatedUsers });
        })
        .catch((err => res.status(400).json({ err, message: 'Unable to register user' })));
    });
  }
  /**
     * Displays the lis of all users a new user on the platform
     * @static
     * @description list users
     * @param  {object} req gets values passed to the api
     * @param  {object} res sends result as output
     * @returns {object} Success message with the user created or error message
     * @memberOf
     */
  static listUser(req, res) {
    // Parameterized query to avoid sql injection
    db.connect()
      .then(() => {
        // const sql = 'select * from registereduser where id = $1';
        const sql = 'select * from registereduser';
        // const bindingParamater = [1];
        // continue the chain by returning result to the next then block
        // return db.query(sql, bindingParamater);
        return db.query(sql);
      })
      .then((result) => {
        const users = result.rows;
        return res.status(302).json({ message: 'List of clients', users });
      })
      .catch((err) => res.status(400).json({ err, message: 'something is wrong' }));
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
      return res.status(406).json({ message: 'Invalid email or password' });
    }
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
      return res.status(401).json({ message: 'Invalid email or password' });
    });
  //  }
  //  return res.status(401).json({ message: 'Invalid email or password outside' });
  }
}
export default usercontroller;
