import { Router } from 'express';
import { deleteUser, getAllUsers, userLogin, userProfile, userRegister } from '../controllers/userControllers';

const userRouter  = Router();

// USER REGISTER
userRouter.post('/register', userRegister);

// USER LOGIN
userRouter.post('/login', userLogin);

// GET ALL USERS
userRouter.get('/all', getAllUsers);

// GET USER PROFILE
userRouter.get('/profile/:id', userProfile);

// DELETE USER
userRouter.delete('/:id/delete', deleteUser);

export default userRouter;
