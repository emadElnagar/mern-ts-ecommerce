import { RequestHandler } from "express";
import User from "../models/user";
import bcrypt from 'bcrypt';
import { generateToken } from "../utils";

// USER REGISTER CONTROLLER
export const userRegister: RequestHandler = async (req, res) => {
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
    res.send({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      isAdmin: user.isAdmin,
      image: user.image,
      phone: user.phone,
      token: generateToken(user._id)
    });
  }).catch(err => {
    res.status(401).json({
      message: err.message
    });
  });
}

// USER LOGIN CONTROLLER
export const userLogin: RequestHandler = async (req, res) => {
  const user = await User.findOne({email: req.body.email});
  if(user){
    if(bcrypt.compareSync(req.body.password, user.password)){
      res.send({
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        isAdmin: user.isAdmin,
        image: user.image,
        phone: user.phone,
        token: generateToken(user._id)
      });
      return;
    }
  }
  res.status(401).send({message: 'invalid email or password'});
}

// GET USER PROFILE CONTROLLER
export const userProfile: RequestHandler = async (req, res) => {
  const profile = await User.findById(req.params.id);
  if (profile) {
    res.send(profile);
  } else {
    res.status(404).json({
      message: 'User Not Found'
    });
  }
}
