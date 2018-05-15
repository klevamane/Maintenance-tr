import express from 'express';
import usercontroller from '../controllers/userController';


const routes = express.Router();
routes.post('/signup', usercontroller.createUser);
export default routes;
