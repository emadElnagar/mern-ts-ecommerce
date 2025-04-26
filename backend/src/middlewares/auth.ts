import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import User from "../models/user";

interface AuthRequest extends Request {
  user?: any;
}

interface DecodedToken extends JwtPayload {
  _id: string;
}

export const isAuth = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET!
      ) as DecodedToken;

      req.user = await User.findById(decoded._id).select("-password");
      return next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
};

//admin acceess
export const isAdmin = async (
  req: { user: { _id: any } },
  res: {
    status: (arg0: number) => {
      (): any;
      new (): any;
      send: {
        (arg0: { success: boolean; message: string; error?: unknown }): void;
        new (): any;
      };
    };
  },
  next: () => void
) => {
  try {
    const user = await User.findById(req.user._id);
    if (user) {
      if (user.role === "admin") {
        return res.status(401).send({
          success: false,
          message: "UnAuthorized Access",
        });
      } else {
        next();
      }
    }
  } catch (error) {
    res.status(401).send({
      success: false,
      error,
      message: "User is not admin",
    });
  }
};

// Generate Token
export const generateToken = (user: {
  _id: object;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  image: string;
}) => {
  return jwt.sign(
    {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      image: user.image,
    },
    process.env.JWT_SECRET!,
    {
      expiresIn: "3d",
    }
  );
};
