import winston from 'winston';
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
    // user tablename.columname to avoid ambiguity for similar column names
    db.connect()
      .then((client) => {
        const everyUsersRequests = db.query('select request.id, fault, brand, modelnumber, description, other,userid, name, createdon from request INNER JOIN status ON status.id = request.statusid ORDER BY createdon DESC');
        client.release();
        return everyUsersRequests;
      })
      .then((listOfeveryUsersRequests) => {
        if (listOfeveryUsersRequests.rowCount < 1) {
          return res.status(404).json({ error: 'No request found' });
        }
        const allRequests = listOfeveryUsersRequests.rows;
        res.status(200).json({ message: 'All requests', allRequests });
      })
      .catch(((err) => {
        winston.info(err);
        res.status(400).json({ message: 'Unable to List all requests' });
      }));
  }
  
  /**
* @static
* @description List single request by the logged in user
* @param  {object} req gets values passed to the api
* @param  {object} res sends result as output
* @returns {object} Success message with request or error message
  */
  static getUserRequestById(req, res) {
    const id = parseInt(req.params.requestId, 10);
    const bindingParameters = [id];
    // const sql = 'select * from request where userid = $1 and id = $2';
    const sql = 'select request.id, fault, brand, modelnumber, description, other,userid, name as status, createdon from request INNER JOIN status ON status.id = request.statusid where request.id = $1';
    db.connect()
      .then((client) => {
        const InitialSingleUserRequest = client.query(sql, bindingParameters);
        client.release();
        return InitialSingleUserRequest;
      })
      .then((request) => {
        if (request.rowCount < 1) {
          return res.status(404).json({ error: 'Request not found' });
        }
        const requestFoundById = request.rows;
        return res.status(200).json({ message: 'Request found', requestFoundById });
      })
      .catch((err) => {
        winston.info(err);
        res.status(400).json({ message: 'something is wrong' });
      });
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
    db.connect()
      .then((client) => {
        const result = client.query(sql, bindingParameters);
        client.release();
        return result;
      })
      .then((updatedRequest) => {
        if (updatedRequest.rowCount < 1) {
          return res.status(400).json({ message: 'Unable approve the request' });
        }
        res.status(200).json({ message: 'Request has been approved' });
      });
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
    const bindingParameters = [3, id];
    // Use join statement to resolve foreign key name by using tablename.columnname
    const sql = `UPDATE request set statusid = $1  from status where request.id =$2
         and (status.name != 'Dissaproved' or status.name != 'resolved')`;
    db.connect()
      .then((client) => {
        const result = db.query(sql, bindingParameters);
        client.release();
        return result;
      })
      .then(() => {
        res.status(200).json({ message: 'Request has been rejected' });
      });
  }

  /**
  * @static
  * @description Delete a user
  * @param  {object} req gets values passed to the api
  * @param  {object} res sends result as output
  * @returns {object} Success message with the with 200 status code
  */
  static deleteUser(req, res) {
    const sql = 'delete from registereduser where id = $1 RETURNING *';
    const bindingParameter = [req.params.userId];
    db.connect()
      .then((client) => {
        const result = client.query(sql, bindingParameter);
        client.release();
        return result;
      })
      .then((deletedUser) => {
      //  winston.info(deletedUser);
        if (deletedUser.rowCount > 0) {
          return res.status(200).json({ message: 'The user has been deleted' });
        }
        res.status(404).json({ error: 'Unable to delete the user' });
      })
      .catch(((err) => {
        winston.info(err);
        return res.status(400).json({ message: 'The delete operation was not successful' });
      }));
  }

  /**
* @static
* @description Modify the state to request of a registered user in user to Resolved
* @param  {object} req gets values passed to the api
* @param  {object} res sends the disapproved request
* @returns {object} Sends the output with success message and status code
  */
  static resolveUserRequest(req, res) {
    const id = parseInt(req.params.requestId, 10);
    const bindingParameters = [4, id];
    // Use join statement to resolve foreign key name by using tablename.columnname
    const sql = `UPDATE request set statusid = $1  from status where request.id =$2
       and (status.name != 'Dissaproved' or status.name != 'resolved')`;
    db.connect()
      .then((client) => {
        const result = client.query(sql, bindingParameters);
        client.release();
        return result;
      })
      .then(() => {
        res.status(200).json({ message: 'Request has been resolved' });
        // }
      });
  }
}
export default adminController;
