import winston from 'winston';
import Requests from '../models/request';
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
        const userid = parseInt(req.decodedUserData.id, 10);
        const sql = 'INSERT INTO request(fault, brand, modelnumber, userid, description, other, statusid) VALUES ( $1, $2, $3, $4, $5, $6, $7)';
        const bindingParamaters = [req.body.fault, req.body.brand, req.body.modelnumber,
          userid, req.body.description, 'timeofday()', '1'];
          // continue the chain by returning result to the next then block
        return db.query(sql, bindingParamaters);
      })
      .then((requestRecieved) => {
        const numberofRequestCreated = requestRecieved.rowCount;
        return res.status(201).json({ message: 'Request  has been created', numberofRequestCreated });
      })
      .catch((err => res.status(400).json({ err, message: 'Unable to register user' })));
  }

  /**
  * @static
  * @description List all user requests
  * @param  {object} req gets values passed to the api
  * @param  {object} res sends result as output
  * @returns {object} Success message with the request list or error message
  */
  static getUserRequests(req, res) {
    const authentcationTokenId = parseInt(req.decodedUserData.id, 10);
    const userRequests = [];
    for (let i = 0; i < Requests.length; i += 1) {
      if (Requests[i].userid === authentcationTokenId) {
        userRequests.push(Requests[i]);
      }
    }

    if (userRequests.length === 0) {
      return res.status(401).json({ message: 'No request for this user' });
    }
    return res.status(200).json({ message: 'Displaying user requests', userRequests });
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
    const requestGottenById = Requests.filter(element =>
      ((element.userid === req.decodedUserData.id) && (element.id === id)));
    if (requestGottenById.length !== 1) {
      return res.status(404).json({ error: 'Request not found' });
    }
    return res.status(200).json({ message: 'Request found', requestGottenById });
  }

  /**
       * @static
       * @description Deletes a user request, the request must be deleted only by the owner
       * @param  {object} req gets values passed to the api
       * @param  {object} res sends result as output
       * @returns {object} Success message with the business updated or error message
       */
  static deleteRequest(req, res) {
    let status = false;
    let requestPosition;
    const requestOwnerId = parseInt(req.decodedUserData.id, 10);
    const requestId = parseInt(req.params.requestId, 10);
    for (let i = 0; i < Requests.length; i += 1) {
      if (Requests[i].id === requestId && Requests[i].userid === requestOwnerId) {
        requestPosition = i;
        status = true;
        break;
      }
    }
    if (status === false) {
      return res.status(401).json({
        message: 'Only business owner can delete a business',
        error: true
      });
    }
    Requests.splice(requestPosition, 1);
    return res.status(200).json({
      message: 'The request has been deleted',
      Requests,
    });
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
    let requestPosition = -1;
    let status = false;
    if (id > Requests.length) { return res.status(403).json({ message: 'Bad request' }); }
    const loggedInUserId = parseInt(req.decodedUserData.id, 10);
    for (let i = 0; i < Requests.length; i += 1) {
      if (Requests[i].id === id && Requests[i].userid === loggedInUserId) {
        requestPosition = i;
        status = true;
        break;
      }
    }
    if (status === false) {
      return res.status(401).json({ message: 'You are Unauthorized to edit this request' });
    }
    const changesToBeMade = {
      status: 'Pending',
      fault: req.body.fault,
      brand: req.body.brand,
      modelNumber: req.body.modelNumber,
      user: req.decodedUserData,
      description: req.body.description,
      other: req.body.other,
      createdAt: Date.now(),
      updatedAt: Date.now()
    };
    Requests[requestPosition] = changesToBeMade;
    const updatedRequest = Requests[requestPosition];
    return res.status(200).json({ message: 'Request has been modified', updatedRequest });
  }
}
export default requestController;
