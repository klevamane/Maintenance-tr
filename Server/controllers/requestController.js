import winston from 'winston';
// import jwt from 'jsonwebtoken';
import Requests from '../models/request';


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
    const createAnewRequest = {
      id: Requests.length + 1,
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
    Requests.push(createAnewRequest);
    const position = Requests.length - 1;
    const newRequest = Requests[position];
    return res.status(200).json({ message: 'Request has been sent', newRequest });
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
    // winston.info(`This is the authtoken: ${authentcationTokenId}`);
    const userRequests = [];
    for (let i = 0; i < Requests.length; i += 1) {
      if (Requests[i].userid === authentcationTokenId) {
        userRequests.push(Requests[i]);
      }
    }
    winston.info(`Number og requests are ${userRequests.length}`);

    if (userRequests.length === 0) {
      return res.status(401).json({ message: 'No request for this user' });
    }
    winston.info(`Number og requests Again are ${userRequests.length}`);
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
    return res.status(302).json({ message: 'Request found', requestGottenById });
    // winston.info(newArray);
    // winston.info(newArray.length);
  }
}
export default requestController;
