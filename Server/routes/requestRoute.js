import express from 'express';
import requestController from '../controllers/requestController';
import { checkAuthentication } from '../middlewares/authentication';
import { validateNewRequest } from '../middlewares/validation';

const routes = express.Router();
routes.post('/requests', checkAuthentication, validateNewRequest, requestController.createRequest);
routes.post('/requests', checkAuthentication, requestController.createRequest);
routes.get('/requests', checkAuthentication, requestController.getUserRequests);
routes.get('/requests/:requestId', checkAuthentication, requestController.getUserRequestById);

export default routes;