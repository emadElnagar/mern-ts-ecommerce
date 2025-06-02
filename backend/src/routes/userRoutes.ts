import { RequestHandler, Router } from "express";
import {
  changePassword,
  changeRole,
  changeUserEmail,
  deleteProfile,
  deleteUser,
  getAllUsers,
  SearchUser,
  updateUserName,
  uploadImage,
  userLogin,
  userProfile,
  userRegister,
} from "../controllers/userControllers";
import { isAuth } from "../middlewares/auth";
import { upload } from "../middlewares/multer";
import { AuthenticatedRequest } from "../controllers/userControllers";

const userRouter = Router();

// USER REGISTER
userRouter.post("/register", userRegister);

// USER LOGIN
userRouter.post("/login", userLogin);

// GET ALL USERS
userRouter.get("/all", getAllUsers);

// GET USER PROFILE
userRouter.get("/profile/:id", userProfile);

// UPDATE USER NAME
userRouter.post("/name/update", isAuth as RequestHandler, (req, res) =>
  updateUserName(req as AuthenticatedRequest, res)
);

// CHANGE USER EMAIL
userRouter.patch("/:id/email/change", changeUserEmail);

// CHANGE USER IMAGE
userRouter.patch("/profile/:id/image", upload.single("usrimg"), uploadImage);

// CHANGE PASSWORD
userRouter.patch("/:id/password/change", changePassword);

// CHANGE USER ROLE
userRouter.patch("/:id/update/role", changeRole);

// DELETE MY PROFILE
userRouter.post("/profile/:id/delete", deleteProfile);

// DELETE USER
userRouter.delete("/:id/delete", deleteUser);

// SEARCH USER
userRouter.get("/", SearchUser);

export default userRouter;
