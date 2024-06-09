import { Response, NextFunction } from 'express';
import { verifyJWT } from '../utils';
import User from '../schemas/user';

const authMiddleware = async (req: any, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).send('Access denied. No token provided.');
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).send('Access denied. Invalid token.');
  }

  const decoded = verifyJWT(token);

  if (!decoded) {
    return res.status(401).send('Access denied. Invalid token.');
  }

  const user = await User.findOne({ email: decoded.email });

  if (!user) {
    return res.status(401).send('Is not user e-mail valid.');
  }

  req.user = user;

  next();
};

export default authMiddleware;