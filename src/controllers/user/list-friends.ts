import { NextFunction, Request, Response } from 'express';
import { listUsers } from '@/service/user';

export const listFriends = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const users = await listUsers();

    return res.status(200).send(users);
  } catch (error) {
    return next(error);
  }
};
