import { RequestHandler } from "express";
import User from "../models/user";
import bcrypt from "bcrypt";
import { generateToken } from "../middlewares/auth";
import fs from "fs";
import path from "path";
import { Request, Response } from "express";

export interface AuthenticatedRequest extends Request {
  user: {
    _id: string;
    firstName: string;
    lastName: string;
    password: string;
    email: string;
    role: string;
    image?: string;
  };
}

// USER REGISTER CONTROLLER
export const userRegister: RequestHandler = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "This email is already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    const token = generateToken({
      _id: user._id,
      firstName,
      lastName,
      email,
      role: user.role,
      image: user.image ?? "",
    });

    await user.save();
    res.status(200).json({ token });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// USER LOGIN CONTROLLER
export const userLogin: RequestHandler = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = generateToken({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      image: user.image ?? "",
    });

    res.status(200).json({ token });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL USERS
export const getAllUsers: RequestHandler = async (_req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// GET USER PROFILE CONTROLLER
export const userProfile: RequestHandler = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE USER NAME
export const updateUserName = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const user = req.user;
  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const newUser = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  };
  try {
    await User.updateOne({ _id: user._id }, { $set: newUser });
    res.status(200).json({ message: "User name updated successfully" });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

// CHANGE USER EMAIL
export const changeUserEmail = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const existingUser = await User.find({ email: req.body.email });
    if (existingUser.length > 0) {
      return res.status(400).json({ message: "Email already exists" });
    }
    if (!req.body.email) {
      return res.status(400).json({ message: "New email is required" });
    }
    // Update the user's email
    await User.updateOne(
      { _id: user._id },
      { $set: { email: req.body.email } }
    );
    res.status(200).json({ message: "User email updated successfully" });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
  const newUser = {
    email: req.body.email,
  };
};

// CHANGE USER PASSWORD
export const changePassword = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    if (!req.body.currentPassword || !req.body.newPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const isCurrentPasswordValid = await bcrypt.compare(
      req.body.currentPassword,
      user.password
    );
    if (!isCurrentPasswordValid) {
      return res.status(401).json({ message: "Current password is incorrect" });
    }
    const hashedNewPassword = await bcrypt.hash(req.body.newPassword, 10);
    const newUser = { password: hashedNewPassword };
    await User.updateOne({ _id: user._id }, { $set: newUser });
    res.status(200).json({ message: "Password changed successfully" });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

// CHANGE USER IMAGE
export const uploadImage = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    if (!req.file) {
      return res.status(400).json({
        message: "No file uploaded",
      });
    }
    // Remove old image if it exists
    if (user.image) {
      const oldImagePath = path.resolve(
        __dirname,
        "../../uploads/images",
        user.image
      );
      fs.promises.unlink(oldImagePath).catch((err) => {
        console.warn(
          `Failed to delete old image (${user.image}):`,
          err.message
        );
      });
    }
    // Update user with new image
    const newUser = { image: req.file.filename };
    await User.updateOne({ _id: user._id }, { $set: newUser });
    res.status(200).json({
      message: "Image uploaded successfully",
    });
  } catch (error: any) {
    res.status(500).json({
      message: "Error uploading image: " + error.message,
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
