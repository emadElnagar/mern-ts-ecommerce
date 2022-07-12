import { Router } from 'express';
import { userLogin, userRegister } from '../controllers/userControllers';

const userRouter  = Router();

// USER REGISTER
userRouter.post('/register', userRegister);

// USER LOGIN
userRouter.post('/login', userLogin);

export default userRouter;
