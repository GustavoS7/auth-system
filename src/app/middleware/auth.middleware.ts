import { NextFunction, Request, Response } from 'express';
import { UnathorizedError } from '@/errors';
import jwt from 'jsonwebtoken';
import { env } from '../env';

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const bearerToken = req.headers.authorization;

  if (!bearerToken) return next(new UnathorizedError());

  const token = bearerToken.split(' ')[1];

  jwt.verify(token, env.TOKEN_SECRET, (error, payload: any) => {
    if (error) return next(new UnathorizedError());
    req.user = payload;
    return next();
  });
};
