import { RequestHandler } from "express";
import User from "../models/user";
import bcrypt from "bcrypt";
import { generateToken } from "../middlewares/auth";
import fs from "fs";
import path from "path";
import { Response } from "express";
import { AuthenticatedRequest } from "../types/authTypes";

// USER REGISTER CONTROLLER
export const userRegister: RequestHandler = async (req, res) => {
  try {
    // Validation checks for registration
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
    if (firstName.length < 3 || firstName.length > 20) {
      return res
        .status(400)
        .json({ message: "First name must be between 3 and 20 characters" });
    }
    if (lastName.length < 3 || lastName.length > 20) {
      return res
        .status(400)
        .json({ message: "Last name must be between 3 and 20 characters" });
    }
    if (!/^[a-zA-Z]+$/.test(firstName)) {
      return res
        .status(400)
        .json({ message: "First name must be letters only" });
    }
    if (!/^[a-zA-Z]+$/.test(lastName)) {
      return res
        .status(400)
        .json({ message: "Last name must be letters only" });
    }
    const newEmail = req.body.email?.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newEmail)) {
      return res.status(400).json({ message: "Invalid email format" });
    }
    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters long" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      firstName,
      lastName,
      email: newEmail,
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
    const newEmail = req.body.email?.trim().toLowerCase();

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!newEmail) {
      return res.status(400).json({ message: "New email is required" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newEmail)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    const existingUser = await User.findOne({
      email: newEmail,
      _id: { $ne: user._id },
    });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Email already exists, try another one" });
    }

    await User.updateOne({ _id: user._id }, { $set: { email: newEmail } });

    return res.status(200).json({ message: "User email updated successfully" });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
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
export const changeRole = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const user = await User.findById(req.params.id);
    const { role } = req.body;
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (!req.body.role) {
      return res.status(400).json({ message: "Role is required" });
    }
    const validRoles = ["user", "admin", "moderator"];
    if (!validRoles.includes(req.body.role)) {
      return res.status(400).json({ message: "Invalid role" });
    }
    // Update the user's role
    await User.updateOne(
      { _id: req.params.id },
      { $set: { role } },
      { new: true }
    );
    res.status(200).json({ message: "User role updated successfully" });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

// DELETE PROFILE (By User)
export const deleteProfile = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    // Check if the user has provided a password for deletion
    const validate = await bcrypt.compare(req.body.password, user.password);
    if (!validate) {
      return res.status(401).json({
        message: "Password is incorrect",
      });
    }
    // Remove old image if it exists
    if (user.image) {
      const userImage = path.resolve(
        __dirname,
        "../../uploads/images",
        user.image
      );
      fs.promises.unlink(userImage).catch((err) => {
        console.warn(`Failed to delete image (${user.image}):`, err.message);
      });
    }
    // Delete the user
    await User.deleteOne({ _id: user._id });
    res.status(200).json({ message: "User profile deleted successfully" });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

// DELETE USER (By Admin)
export const deleteUser = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const admin = req.user;
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // Check if the user has an image and delete it
    if (user.image) {
      const userImage = path.resolve(
        __dirname,
        "../../uploads/images",
        user.image
      );
      fs.promises.unlink(userImage).catch((err) => {
        console.warn(`Failed to delete image (${user.image}):`, err.message);
      });
    }
    // Check if the admin is trying to delete their own account
    if (admin && admin._id.toString() === user._id.toString()) {
      return res
        .status(400)
        .json({ message: "You cannot delete your own account" });
    }
    // Delete the user
    await User.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
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
