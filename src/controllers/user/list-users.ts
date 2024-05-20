import { NextFunction, Request, Response } from 'express';
import { fetchUsers } from '@/service/user';

export const listUsers = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const users = await fetchUsers();

    return res.status(200).send(users);
  } catch (error) {
    return next(error);
  }
};
