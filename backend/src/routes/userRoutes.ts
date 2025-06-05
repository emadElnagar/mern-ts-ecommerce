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
import { isAdmin, isAuth } from "../middlewares/auth";
import { upload } from "../middlewares/multer";
import { AuthenticatedRequest } from "../types/authTypes";

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
userRouter.patch("/email/change", isAuth as RequestHandler, (req, res) =>
  changeUserEmail(req as AuthenticatedRequest, res)
);

// CHANGE USER IMAGE
userRouter.patch(
  "/profile/image",
  isAuth as RequestHandler,
  upload.single("usrimg"),
  (req, res) => uploadImage(req as AuthenticatedRequest, res)
);

// CHANGE PASSWORD
userRouter.patch("/password/change", isAuth as RequestHandler, (req, res) =>
  changePassword(req as AuthenticatedRequest, res)
);

// CHANGE USER ROLE
userRouter.patch(
  "/:id/update/role",
  isAuth as RequestHandler,
  isAdmin as RequestHandler,
  (req, res) => changeRole(req as AuthenticatedRequest, res)
);

// DELETE MY PROFILE
userRouter.post("/profile/delete", isAuth as RequestHandler, (req, res) =>
  deleteProfile(req as AuthenticatedRequest, res)
);

// DELETE USER
userRouter.delete(
  "/:id/delete",
  isAuth as RequestHandler,
  isAdmin as RequestHandler,
  (req, res) => deleteUser(req as AuthenticatedRequest, res)
);

// SEARCH USER
userRouter.get("/", SearchUser);

export default userRouter;
