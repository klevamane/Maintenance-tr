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

      const bindingParamaters =
      [req.body.firstname, req.body.lastname, req.body.email, req.body.mobile, hash];
      // const bind2 = ['onengrichfavour@email.com'];
      const sql = 'INSERT INTO registereduser(firstname, lastname, email, mobile, password) VALUES ( $1, $2, $3, $4, $5) RETURNING *';

      db.connect()
        .then((client) => {
          const result = client.query(sql, bindingParamaters);
          client.release();
          return result;
        }).then((result) => {
          const user = {
            id: result.rows[0].id,
            firstname: result.rows[0].firstname,
            lastname: result.rows[0].lastname,
            email: result.rows[0].email,
            mobile: result.rows[0].mobile
          };
          return res.status(201).json({ message: 'User has been registered', user });
        })
        .catch(((err) => {
          winston.info(err);
          return res.status(400).json({ error: 'Unable to register a new user' });
        }));
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
  static listAllUsers(req, res) {
    const sql = 'select id, firstname, lastname, email, mobile, isadmin from registereduser';
    db.query(sql)
      .then((result) => {
        const listOfAllUsers = result.rows;
        return res.status(302).json({ message: 'List of users', listOfAllUsers });
      })
      .catch(err => res.status(400).json({ err, error: 'Could not list users' }));
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
      .then((client) => {
        const sql = 'select * from registereduser where email =$1 LIMIT 1 ';
        const bindingParamaters = [req.body.email];
        // continue the chain by returning result to the next then block
        const value = client.query(sql, bindingParamaters);
        client.release();
        return value;
      })
      .then((user) => {
        const storedPassword = user.rows[0].password;
        const isadmin = user.rows[0].isadmin;
        const userid = user.rows[0].id;
        const id = user.rows[0].id;
        const payload = {
          id,
          isadmin
        };
        bcrypt.compare(req.body.password, storedPassword, (err, result) => {
          if (result) {
            // Ensure to put the secretekey in your environment variable
           // const token = jwt.sign({ id: user.rows[0].id }, 'secreteKey', { expiresIn: 60 * process.env.TOKENEXPIRY });
           const token = jwt.sign({ payload }, 'secreteKey', { expiresIn: 60 * process.env.TOKENEXPIRY });
            return res.status(202).json({
              message: 'User has been authenticated',
              token,
              isadmin,
              userid
            });
          }
          return res.status(401).json({ error: 'Invalid email or password' });
        });
      })
      .catch(((err) => {
        winston.info(err);
        res.status(400).json({ error: 'Unable to process login information' });
      }));
  }
}
// }
export default usercontroller;
