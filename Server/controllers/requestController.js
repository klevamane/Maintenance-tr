import winston from 'winston';
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
      user: req.decodedUserData.id,
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
  * @description List all user requests businesses
  * @param  {object} req gets values passed to the api
  * @param  {object} res sends result as output
  * @returns {object} Success message with the request list or error message
  */
  static getUserRequests(req, res) {
    const userRequests = [];
    for (let i = 0; i < Requests.length; i += 1) {
      if (Requests[i].userid === req.decodedUserData.id) {
        userRequests.push(Requests[i]);
      }
    }
    winston.info(userRequests.length);
    if (userRequests.length === 0) {
      return res.status(404).json({ message: 'No request found' });
    }
    return res.status(302).json({ message: 'Displaying user requests ', userRequests });
  }
}
export default requestController;

