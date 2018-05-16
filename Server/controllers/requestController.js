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
      user: req.decodedUserDate.id,
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
}
export default requestController;

