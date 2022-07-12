import jwt from 'jsonwebtoken';
const jwtSecret = process.env.SJWT_SECRET || 'seretcode';

export const generateToken = (id: object) => {
  return jwt.sign({
    id
  }, jwtSecret, {
    expiresIn: '3d'
  });
}
