import express from 'express';
import usercontroller from '../controllers/userController';
import { checkIfEmailAlreadyExist, checkIfMobileAlreadyExist, checkIfLoginEmailExist } from '../middlewares/helpers';
import { validateCreateUser, validateAuthenticateUser } from '../middlewares/validation';

const routes = express.Router();
routes.post('/signup', validateCreateUser, checkIfEmailAlreadyExist, checkIfMobileAlreadyExist, usercontroller.registerUser);
routes.post('/login', validateAuthenticateUser, checkIfLoginEmailExist, usercontroller.authenticateUser);
export default routes;
