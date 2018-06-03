import db from '../connection';

/**
* @class requestController
* @classdesc creates a request class with methods
*/
class requestController {
  /**
      * @static
      * @description create a maintenance or repair request for a device / product
      * @param  {object} req gets values passed to the api
      * @param  {object} res sends result as output
      * @returns {object} Success message with the user created or error message
      */
  static createRequest(req, res) {
    db.connect()
      .then(() => {
        const sql = 'INSERT INTO request(fault, brand, modelnumber, userid, description, other, statusid) VALUES ( $1, $2, $3, $4, $5, $6, $7)';
        const bindingParamaters = [req.body.fault, req.body.brand, req.body.modelnumber,
          req.decodedUserData.id, req.body.description, req.body.other, 1];
          // continue the chain by returning result to the next then block
        return db.query(sql, bindingParamaters);
      })
      .then((requestRecieved) => {
        const numberofRequestCreated = requestRecieved.rowCount;
        if (numberofRequestCreated < 1) {
          return res.status(400).json({ messgae: 'Unable to make request inner' });
        }
        return res.status(201).json({ message: 'Request has been created', numberofRequestCreated });
      })
      .catch((err => res.status(400).json({ err, message: 'Unable to make request outer' })));
  }

  /**
  * @static
  * @description List all user requests
  * @param  {object} req gets values passed to the api
  * @param  {object} res sends result as output
  * @returns {object} Success message with the request list or error message
  */
  static getUserRequests(req, res) {
    const bindingParameter = [req.decodedUserData.id];
    // const sql = 'select * from request where userid = $1';
    const sql = 'select request.id, fault, brand, modelnumber, description, other,userid, name as status, createdon from request INNER JOIN status ON status.id = request.statusid where userid = $1 ORDER BY createdon DESC';
    db.query(sql, bindingParameter)
      .then((userRequests) => {
        if (userRequests.rowCount < 1) {
          return res.status(401).json({ message: 'No request for this user' });
        }
        const allUserRequests = userRequests.rows;
        res.status(200).json({ message: 'Displaying user requests', allUserRequests });
      });
  }

  /**
* @static
* @description List single request by the logged in user
* @param  {object} req gets values passed to the api
* @param  {object} res sends result as output
* @returns {object} Success message with request list or error message
  */
  static getUserRequestById(req, res) {
    const id = parseInt(req.params.requestId, 10);
    const bindingParameters = [req.decodedUserData.id, id];
   // const sql = 'select * from request where userid = $1 and id = $2';
   const sql = 'select request.id, fault, brand, modelnumber, description, other,userid, name as status, createdon from request INNER JOIN status ON status.id = request.statusid where userid = $1 and request.id = $2';
    db.query(sql, bindingParameters)
      .then((request) => {
        if (request.rowCount < 1) {
          return res.status(404).json({ error: 'Request not found' });
        }
        const requestFoundById = request.rows;
        return res.status(200).json({ message: 'Request found', requestFoundById });
      })
      .catch(err => res.status(400).json({ err, message: 'something is wrong' }));
  }

  /**
* @static
* @description Modify the request of a logged in user
    Only the owner of the request can modify the request
* @param  {object} req gets values passed to the api
* @param  {object} res sends the modiefied request
* @returns {object} Sends the updated request as output with success message  and status code
  */
  static modifyUserRequest(req, res) {
    const id = parseInt(req.params.requestId, 10);
    const bindingParameters = [req.body.fault, req.body.brand, req.body.modelnumber,
      req.body.description, req.body.other, id, 2, req.decodedUserData.id];
    const sql = 'UPDATE request SET fault=$1, brand=$2, modelnumber=$3, description=$4, other=$5 WHERE id = $6 AND statusid <=$7 AND userid =$8';
    db.query(sql, bindingParameters)
      .then((updatedRequest) => {
        if (updatedRequest.rowCount < 1) {
          return res.status(401).json({ message: 'You are Unauthorized to edit this request' });
        }
        const modifiedRequest = updatedRequest.rows;
        res.status(200).json({ message: 'Request has been modified', modifiedRequest });
      })
      .catch(err => res.status(400).json({ err, message: 'Unable to update request' }));
  }
}
export default requestController;
