import express from 'express';
import usercontroller from '../controllers/userController';
import { checkIfEmailAlreadyExist } from '../middlewares/helpers';
import { validateCreateUser, validateAuthenticateUser } from '../middlewares/validation';

const routes = express.Router();
routes.post('/signup', validateCreateUser, checkIfEmailAlreadyExist, usercontroller.registerUser);
routes.post('/login', validateAuthenticateUser, usercontroller.authenticateUser);
export default routes;
