import { RequestHandler } from "express";
import User from "../models/user";
import bcrypt from 'bcrypt';

// USER REGISTER CONTROLLER
export const userRegister: RequestHandler = async (req, res) => {
  const takenEmail = await User.findOne({ email: req.body.email });
  if (takenEmail) {
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
      });
      return;
    }
  }
  res.status(401).send({message: 'invalid email or password'});
}

// GET ALL USERS
export const getAllUsers: RequestHandler = async (_req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    res.send(error);
  }
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

// UPDATE USER
export const updateUserName: RequestHandler = async (req, res) => {
  const userId = await User.findById(req.params.id);
  const newUser = {
    firstName: req.body.firstName,
    lastName: req.body.lastName
  }
  await User.findByIdAndUpdate(userId, newUser, (err: any, _docs: any) => {
    if (err) {
      res.status(401).json({
        message: err.message
      })
    }
  })
}

// CHANGE USER EMAIL
export const changeUserEmail: RequestHandler =async (req, res) => {
  const newUser = {
    email: req.body.email
  }
  User.updateOne({ _id: req.params._id }, { $set: newUser }).then(_result => {
    res.status(200).json({
      message: "user email updated successfully"
    });
  }).catch(error => {
    res.status(401).json({
      message: "Error" + error.message
    });
  });
}

// DELETE USER
export const deleteUser: RequestHandler = async (req, res) => {
  User.deleteOne({ _id: req.params.id }).then(_result => {
    res.status(200).json({
      message: "User Deleted Successfully"
    });
  }).catch(error => {
    res.status(401).json({
      message: "Error Deleting User" + error.message
    });
  });
}
