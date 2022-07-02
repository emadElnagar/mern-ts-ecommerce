import jwt from 'jsonwebtoken';
const jwtSecret = 'seretcode';

export const generateToken = (user: { 
    _id: object; firstName: string; lastName: string; email: string; isAdmin: boolean; image: string; phone: string; 
  }) => {
  return jwt.sign({
    _id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    isAdmin: user.isAdmin,
    image: user.image,
    phone: user.phone,
  }, jwtSecret, {
    expiresIn: '3d'
  });
}
