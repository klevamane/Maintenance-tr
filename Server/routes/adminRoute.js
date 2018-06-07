import express from 'express';
import admincontroller from '../controllers/adminController';
import { checkAuthentication } from '../middlewares/authentication';
import {
  checkIfUserIsAdmin, checkIfRequestIsApprovable, checkIfRequestExists,
  checkIfRequestIsDisApprovable, checkIfRequestIsResolvable, checkIfRequestIdParamIsValid
} from '../middlewares/helpers';

const routes = express.Router();

routes.get('/requests', checkAuthentication, checkIfUserIsAdmin, admincontroller.getUserRequests);
routes.put(
  '/requests/:requestId/approve', checkAuthentication, checkIfUserIsAdmin, checkIfRequestIdParamIsValid, checkIfRequestExists,
  checkIfRequestIsApprovable, admincontroller.approveUserRequest
);
routes.put(
  '/requests/:requestId/disapprove', checkAuthentication, checkIfUserIsAdmin, checkIfRequestIdParamIsValid, checkIfRequestExists,
  checkIfRequestIsDisApprovable, admincontroller.disapproveUserRequest
);

routes.put(
  '/requests/:requestId/resolve', checkAuthentication, checkIfUserIsAdmin, checkIfRequestIdParamIsValid,
  checkIfRequestExists, checkIfRequestIsResolvable, admincontroller.resolveUserRequest
);
routes.get('/users/users', checkAuthentication, checkIfUserIsAdmin, admincontroller.listAllUsers);

routes.delete('/users/:userId/delete', checkAuthentication, checkIfUserIsAdmin, admincontroller.deleteUser);
export default routes;
