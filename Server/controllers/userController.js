import jwt from 'jsonwebtoken';
import winston from 'winston';
import bcrypt from 'bcrypt';
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
          const sql = 'INSERT INTO registereduser(firstname, lastname, email, mobile, password) VALUES ( $1, $2, $3, $4, $5)';
          const bindingParamaters =
            [req.body.firstname, req.body.lastname, req.body.email, req.body.mobile, hash];
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
        // continue the chain by returning result to the next then block
        // return db.query(sql, bindingParamater);
        return db.query(sql);
      })
      .then((result) => {
        const users = result.rows;
        return res.status(302).json({ message: 'List of clients', users });
      })
      .catch(err => res.status(400).json({ err, message: 'something is wrong' }));
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
    db.connect()
      .then(() => {
        const sql = 'select * from registereduser where email =$1 LIMIT 1 ';
        const bindingParamaters = [req.body.email];
        // continue the chain by returning result to the next then block
        return db.query(sql, bindingParamaters);
      })
      .then((user) => {
        const storedPassword = user.rows[0].password;
        bcrypt.compare(req.body.password, storedPassword, (err, result) => {
          if (result) {
            // Ensure to put the secretekey in your environment variable
            const token = jwt.sign({ id: user.rows[0].id }, 'secreteKey', { expiresIn: 60 * 15 });
            return res.status(202).json({
              message: 'User has been authenticated',
              token
            });
          }
          return res.status(401).json({ message: 'Invalid email or password' });
        });
      })
      .catch((err => res.status(400).json({ err, message: 'Invalid email or password' })));
  }
}
// }
export default usercontroller;
