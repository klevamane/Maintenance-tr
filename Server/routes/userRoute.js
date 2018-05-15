import express from 'express';
import usercontroller from '../controllers/userController';
import { checkIfEmailAlreadyExist } from '../middlewares/helpers';

const routes = express.Router();
routes.post('/signup', checkIfEmailAlreadyExist, usercontroller.registerUser);
export default routes;
