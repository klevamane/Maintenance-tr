import express from 'express';
import requestController from '../controllers/requestController';
import { checkAuthentication } from '../middlewares/authentication';
import { validateNewRequest } from '../middlewares/validation';

const routes = express.Router();
routes.post('/requests', checkAuthentication, validateNewRequest, requestController.createRequest);

export default routes;
