import User from '../models/user';
import { Router } from 'express';
import bcrypt from 'bcrypt';

const userRouter  = Router();

// USER REGISTER
userRouter .post('/register', async (req, res) => {
  const tokenEmail = await User.findOne({ email: req.body.email });
  if (tokenEmail) {
    res.json({ message: 'This email is already registered' });
  }
  interface NewUser {
    firstName: string;
    lastName: string;
    email: string;
    password: string
  }
  const user = new User<NewUser>({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: await bcrypt.hash(req.body.password, 10),
  });
  user.save().then(user => {
    res.status(200).json({
      message: 'User registered successfully'
    });
  }).catch(err => {
    res.status(401).json({
      message: err.message
    });
  });
});

export default userRouter;
