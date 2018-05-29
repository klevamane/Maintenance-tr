import usercontroller from './userController';
import db from '../connection';
/**
* @class adminController
* @classdesc creates an admin class with methods
*/
class adminController extends usercontroller {
/**
  * @static
  * @description List all users requests
  * @param  {object} req gets values passed to the api
  * @param  {object} res sends result as output
  * @returns {object} Success message with the request list or error message
  */
  static getUserRequests(req, res) {
    db.query('select * from requests')
      .then((listOfeveryUsersRequests) => {
        if (listOfeveryUsersRequests.rowCount < 1) {
          return res.status(302).json({ message: 'No request found' });
        }
        const allRequests = listOfeveryUsersRequests.rows;
        res.status(302).json({ message: 'All requests', allRequests });
      })
      .catch((err => res.status(400).json({ err, message: 'Unable to List users' })));
  }
}
