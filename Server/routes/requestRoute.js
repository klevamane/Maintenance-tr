import express from 'express';
import requestController from '../controllers/requestController';
import userController from '../controllers/userController';
import { checkAuthentication } from '../middlewares/authentication';
import { validateNewRequest } from '../middlewares/validation';

const routes = express.Router();
routes.post('/requests', checkAuthentication, validateNewRequest, requestController.createRequest);
routes.get('/requests', checkAuthentication, requestController.getUserRequests);
routes.get('/requests/:requestId', checkAuthentication, requestController.getUserRequestById);
routes.put('/requests/:requestId', checkAuthentication, validateNewRequest, requestController.modifyUserRequest);
// routes.delete('/requests/:requestId', checkAuthentication, requestController.deleteRequest);
routes.get('/all', userController.listUser);

export default routes;
