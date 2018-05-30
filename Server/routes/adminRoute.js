import express from 'express';
import admincontroller from '../controllers/adminController';

const routes = express.Router();

routes.get('/requests', admincontroller.getUserRequests);
routes.put('/requests/:requestId/approve', admincontroller.approveUserRequest);
routes.put('/requests/:requestId/disapprove', admincontroller.disapproveUserRequest);

export default routes;
