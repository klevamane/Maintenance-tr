import express from 'express';
import admincontroller from '../controllers/adminController';
import { checkAuthentication } from '../middlewares/authentication';
import {
  checkIfUserIsAdmin, checkIfRequestIsApprovable, checkIfRequestExists,
  checkIfRequestIsDisApprovable, checkIfRequestIsResolvable 
} from '../middlewares/helpers';

const routes = express.Router();

routes.get('/requests', checkAuthentication, checkIfUserIsAdmin, admincontroller.getUserRequests);
routes.put(
  '/requests/:requestId/approve', checkAuthentication, checkIfUserIsAdmin, checkIfRequestExists,
  checkIfRequestIsApprovable, admincontroller.approveUserRequest
);
routes.put(
  '/requests/:requestId/disapprove', checkAuthentication, checkIfUserIsAdmin, checkIfRequestExists,
  checkIfRequestIsDisApprovable, admincontroller.disapproveUserRequest
);

routes.put(
  '/requests/:requestId/resolve', checkAuthentication, checkIfUserIsAdmin,
  checkIfRequestExists, checkIfRequestIsResolvable, admincontroller.resolveUserRequest
);
export default routes;
