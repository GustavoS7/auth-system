import { env } from '@/app/env';
import jwt from 'jsonwebtoken';

interface MyJwtPayload {
  userId: string;
}

export const verifyToken = async (token: string) => {
  try {
    const decoded = (await jwt.verify(
      token,
      env.REFRESH_TOKEN_SECRET,
    )) as MyJwtPayload;
    return decoded;
  } catch (error) {
    return null;
  }
};
