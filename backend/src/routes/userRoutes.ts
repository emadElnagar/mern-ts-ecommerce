import { Router } from 'express';
import { 
  changePassword, 
  changeUserEmail, 
  deleteProfile, 
  deleteUser, 
  getAllUsers, 
  updateUserName, 
  userLogin, 
  userProfile, 
  userRegister 
} from '../controllers/userControllers';

const userRouter  = Router();

// USER REGISTER
userRouter.post('/register', userRegister);

// USER LOGIN
userRouter.post('/login', userLogin);

// GET ALL USERS
userRouter.get('/all', getAllUsers);

// GET USER PROFILE
userRouter.get('/profile/:id', userProfile);

// UPDATE USER NAME
userRouter.post('/:id/name/update', updateUserName);

// CHANGE USER EMAIL
userRouter.patch('/:id/email/change', changeUserEmail);

// CHANGE PASSWORD
userRouter.patch('/:id/password/change', changePassword);

// DELETE MY PROFILE
userRouter.post('/profile/:id/delete', deleteProfile);

// DELETE USER
userRouter.delete('/:id/delete', deleteUser);

export default userRouter;
