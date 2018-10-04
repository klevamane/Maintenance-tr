import express from 'express';
import requestController from '../controllers/requestController';
import userController from '../controllers/userController';
import { checkAuthentication } from '../middlewares/authentication';
import { validateNewRequest } from '../middlewares/validation';
import { checkIfRequestIdParamIsValid } from '../middlewares/helpers';

const routes = express.Router();
routes.post('/requests', checkAuthentication, requestController.createRequest);
routes.get('/requests', checkAuthentication, requestController.getUserRequests);
routes.get('/requests/:requestId', checkAuthentication, checkIfRequestIdParamIsValid, requestController.getUserRequestById);
routes.put('/requests/:requestId', checkAuthentication, checkIfRequestIdParamIsValid, requestController.modifyUserRequest);
// routes.delete('/requests/:requestId', checkAuthentication, requestController.deleteRequest);
export default routes;
