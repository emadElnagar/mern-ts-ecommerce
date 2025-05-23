import { RequestHandler } from "express";
import User from "../models/user";
import bcrypt from "bcrypt";
import { generateToken } from "../middlewares/auth";

// USER REGISTER CONTROLLER
export const userRegister: RequestHandler = async (req, res) => {
  const takenEmail = await User.findOne({ email: req.body.email });
  if (takenEmail) {
    return res.json({ message: "This email is already registered" });
  }
  interface NewUser {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }
  const user = new User<NewUser>({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: await bcrypt.hash(req.body.password, 10),
  });
  const token = generateToken({
    _id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    role: user.role,
    image: user.image ?? "",
  });
  user
    .save()
    .then((_user) => {
      res.status(200).json({
        token,
      });
    })
    .catch((err) => {
      res.status(401).json({
        message: err.message,
      });
    });
};

// USER LOGIN CONTROLLER
export const userLogin: RequestHandler = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    if (bcrypt.compareSync(req.body.password, user.password)) {
      const token = generateToken({
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        image: user.image ?? "",
      });
      res.status(200).json({
        token,
      });
      return;
    }
  }
  res.status(401).send({ message: "invalid email or password" });
};

// GET ALL USERS
export const getAllUsers: RequestHandler = async (_req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    res.send(error);
  }
};

// GET USER PROFILE CONTROLLER
export const userProfile: RequestHandler = async (req, res) => {
  const profile = await User.findById(req.params.id);
  if (profile) {
    res.send(profile);
  } else {
    return res.status(404).json({
      message: "User Not Found",
    });
  }
};

// UPDATE USER NAME
export const updateUserName: RequestHandler = async (req, res) => {
  const newUser = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  };
  User.updateOne({ _id: req.params.id }, { $set: newUser })
    .then((_result) => {
      res.status(200).json({
        message: "user email updated successfully",
      });
    })
    .catch((error) => {
      res.status(401).json({
        message: "Error" + error.message,
      });
    });
};

// CHANGE USER EMAIL
export const changeUserEmail: RequestHandler = async (req, res) => {
  const newUser = {
    email: req.body.email,
  };
  User.updateOne({ _id: req.params.id }, { $set: newUser })
    .then((_result) => {
      res.status(200).json({
        message: "user email updated successfully",
      });
    })
    .catch((error) => {
      res.status(401).json({
        message: "Error" + error.message,
      });
    });
};

// CHANGE USER PASSWORD
export const changePassword: RequestHandler = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    const validate = await bcrypt.compare(
      req.body.currentPassword,
      user.password
    );
    if (!validate) {
      return res.status(401).json({
        message: "Current password is not correct",
      });
    }
    const newUser = { password: await bcrypt.hash(req.body.newPassword, 10) };
    User.updateOne({ _id: req.params.id }, { $set: newUser })
      .then((_result) => {
        res.status(200).json({
          message: "Password changed successfully",
        });
      })
      .catch((error) => {
        res.status(401).json({
          message: error.message,
        });
      });
  }
};

// CHANGE USER IMAGE
export const uploadImage: RequestHandler = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    const newUser = { image: req.file?.filename };
    User.updateOne({ _id: req.params.id }, { $set: newUser })
      .then((_result) => {
        res.status(200).json({
          message: "Image uploaded successfully",
        });
      })
      .catch((error) => {
        res.status(401).json({
          message: error.message,
        });
      });
  }
};

// CHANGE USER ROLE
export const changeRole: RequestHandler = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }
  const newUser = { role: req.body.role };
  User.updateOne({ _id: req.params.id }, { $set: newUser })
    .then((_result) => {
      res.status(200).json({
        message: "User role updated successfully",
      });
    })
    .catch((error) => {
      res.status(401).json({
        message: error.message,
      });
    });
};

// DELETE PROFILE (By User)
export const deleteProfile: RequestHandler = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    const validate = await bcrypt.compare(req.body.password, user.password);
    if (!validate) {
      return res.status(401).json({
        message: "Password is not correct",
      });
    }
    User.deleteOne({ _id: req.params.id })
      .then((_result) => {
        res.status(200).json({
          message: "User Deleted Successfully",
        });
      })
      .catch((error) => {
        res.status(401).json({
          message: "Error Deleting User" + error.message,
        });
      });
  }
};

// DELETE USER (By Admin)
export const deleteUser: RequestHandler = async (req, res) => {
  User.deleteOne({ _id: req.params.id })
    .then((_result) => {
      res.status(200).json({
        message: "User Deleted Successfully",
      });
    })
    .catch((error) => {
      res.status(401).json({
        message: "Error Deleting User" + error.message,
      });
    });
};

// SEARCH USER
export const SearchUser: RequestHandler = async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { firstName: { $regex: req.query.search, $options: "i" } },
          { lastName: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};
  const users = await User.find(keyword);
  res.status(200).json({ users });
};
