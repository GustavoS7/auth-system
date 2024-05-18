import { NextFunction, Request, Response } from 'express';
import { findUserById } from '@/service/user';
import { UnathorizedError } from '@/errors';

export const me = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user;

    if (!user.userId) throw new UnathorizedError();

    const foundUser = await findUserById(user.userId);

    return res.status(200).send({
      id: foundUser._id,
      name: foundUser.name,
      description: foundUser.description,
      photo: foundUser.photo,
      createdAt: foundUser.createdAt,
    });
  } catch (error) {
    next(error);
  }
};
