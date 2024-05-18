import { NextFunction, Request, Response } from 'express';
import { UnathorizedError } from '@/errors';
import { deleteUser } from '@/service/user';

export const deleteMe = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = req.user;

    if (!user.userId) throw new UnathorizedError();

    await deleteUser(user.userId);

    return res.status(200).send({
      id: user.userId,
    });
  } catch (error) {
    next(error);
  }
};
