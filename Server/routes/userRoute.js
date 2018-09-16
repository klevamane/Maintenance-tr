import express from 'express';
import usercontroller from '../controllers/userController';
import { checkIfEmailAlreadyExist, checkIfMobileAlreadyExist, checkIfLoginEmailExist } from '../middlewares/helpers';


const routes = express.Router();
routes.post('/signup', checkIfEmailAlreadyExist, checkIfMobileAlreadyExist, usercontroller.registerUser);
routes.post('/login', checkIfLoginEmailExist, usercontroller.authenticateUser);
export default routes;
