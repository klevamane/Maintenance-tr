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
    db.query('select fault, brand, modelnumber, description, other,userid, name, createdon from request INNER JOIN status ON status.id = request.statusid ORDER BY createdon DESC')
      .then((listOfeveryUsersRequests) => {
        if (listOfeveryUsersRequests.rowCount < 1) {
          return res.status(302).json({ message: 'No request found' });
        }
        const allRequests = listOfeveryUsersRequests.rows;
        res.status(302).json({ message: 'All requests', allRequests });
      })
      .catch((err => res.status(400).json({ err, message: 'Unable to List users' })));
  }

  /**
* @static
* @description Modify the initial request of a registered user in user to pending
* @param  {object} req gets values passed to the api
* @param  {object} res sends the approved request
* @returns {object} Sends the updated request as output with success message  and status code
  */
  static approveUserRequest(req, res) {
    const id = parseInt(req.params.requestId, 10);
    const bindingParameters = [2, id, 1];
    const sql = 'UPDATE request SET statusid = $1 WHERE id = $2 and statusid = $3';
    db.query(sql, bindingParameters)
      .then((updatedRequest) => {
        if (updatedRequest.rowCount < 1) {
          return res.status(401).json({ message: 'Unable approve the request' });
        }
        const modifiedRequest = updatedRequest.rows;
        res.status(200).json({ message: 'Request has been approved', modifiedRequest });
      })
      .catch(err => res.status(400).json({ err, message: 'Unable to update request' }));
  }

  /**
* @static
* @description Modify the initial request of a registered user in user to Disapproved
* @param  {object} req gets values passed to the api
* @param  {object} res sends the disapproved request
* @returns {object} Sends the updated request as output with success message  and status code
  */
  static disapproveUserRequest(req, res) {
    const id = parseInt(req.params.requestId, 10);
    const bindingParameters = [1, id];
    const sql = `UPDATE request set statusid = $1  from status where request.id =$2
         and (status.name != 'Dissaproved' or status.name != 'resolved')`;
    db.query(sql, bindingParameters)
      .then((updatedRequest) => {
        if (updatedRequest.rowCount < 1) {
          return res.status(304).json({ message: 'Unable reject the request' });
        }
        res.status(200).json({ message: 'Request has been rejected' });
      })
      .catch(err => res.status(400).json({ err, message: 'Unable to reject request' }));
  }


//   /**
//      * Register a new Admin user on the platform
//      * @static
//      * @description create a new user
//      * @param  {object} req gets values passed to the api
//      * @param  {object} res sends result as output
//      * @returns {object} Success message with the user created or error message
//      * @memberOf
//      */
//   static registerUser(req, res) {
//     bcrypt.hash(req.body.password, 10, (err, hash) => {
//       if (err) {
//         return res.status(500).json({ error: err });
//       }

//       db.connect()
//         .then(() => {
//           const sql = 'INSERT INTO registereduser(firstname, lastname, email, mobile, password, isadmin) VALUES ( $1, $2, $3, $4, $5)';
//           const bindingParamaters =
//             [req.body.firstname, req.body.lastname, req.body.email, req.body.mobile, hash, true];
//           // continue the chain by returning result to the next then block
//           return db.query(sql, bindingParamaters);
//         })
//         .then((user) => {
//           const numberofCreatedUsers = user.rowCount;
//           return res.status(201).json({ message: 'Admin User has been registered', numberofCreatedUsers });
//         })
//         .catch((err => res.status(400).json({ err, message: 'Unable to register a new admin' })));
//     });
//   }
}
export default adminController;