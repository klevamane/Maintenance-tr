import express from 'express';
import admincontroller from '../controllers/adminController';
import { checkAuthentication } from '../middlewares/authentication';
import { checkIfUserIsAdmin } from '../middlewares/helpers';

const routes = express.Router();

routes.get('/requests', checkAuthentication, checkIfUserIsAdmin, admincontroller.getUserRequests);
routes.put('/requests/:requestId/approve', checkAuthentication, checkIfUserIsAdmin, admincontroller.approveUserRequest);
routes.put('/requests/:requestId/disapprove', checkAuthentication, checkIfUserIsAdmin, admincontroller.disapproveUserRequest);

export default routes;
