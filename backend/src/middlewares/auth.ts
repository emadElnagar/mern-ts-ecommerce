import JWT from "jsonwebtoken";
import User from "../models/user";

const JWT_SECRET = process.env.JWT_SECRET || "secretcode";

//Protected Routes token base
export const isSignIn = async (
  req: { headers: { authorization: string }; user: string | JWT.JwtPayload },
  _res: any,
  next: () => void
) => {
  try {
    const decode = JWT.verify(req.headers.authorization, JWT_SECRET);
    req.user = decode;
    next();
  } catch (error) {
    console.log(error);
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
  return JWT.sign(
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
