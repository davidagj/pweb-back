import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dot from 'dotenv';

dot.config();

export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

export const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  const isMatch = await bcrypt.compare(password, hashedPassword);
  return isMatch;
};

export const sendResponse = ({ success, data, message }: { success: boolean, data?: any, message?: string }) => {
  return success 
    ? {
      success,
      data
    }
    : {
      success,
      error: message,
    }
}

export const generateJWT = (payload: Record<string, any>): string => 
  jwt.sign(payload, String(process.env.SECRET_KEY), { expiresIn: '1h' });

export const verifyJWT = (token: string): Record<string, any> | null => {
  try {
    const decoded = jwt.verify(token, String(process.env.SECRET_KEY)) as Record<string, any>;
    return decoded;
  } catch (error) {
    console.error('Invalid token:', error);
    return null;
  }
}