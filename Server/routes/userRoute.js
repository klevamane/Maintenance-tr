import express from 'express';
import usercontroller from '../controllers/userController';
import { checkIfEmailAlreadyExist } from '../middlewares/helpers';
import { validateCreateUser } from '../middlewares/validation';

const routes = express.Router();
routes.post('/signup', validateCreateUser, checkIfEmailAlreadyExist, usercontroller.registerUser);
export default routes;
