import User from '../models/user';
import { Router } from 'express';
import { userRegister } from '../controllers/userControllers';

const userRouter  = Router();

// USER REGISTER
userRouter .post('/register', userRegister);

export default userRouter;
