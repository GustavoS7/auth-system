import { NextFunction, Request, Response } from 'express';
import { UnathorizedError } from '@/errors';
import { updateUser } from '@/service/user';
import { z } from 'zod';

const updateMeDataInput = z.object({
  name: z.string().max(255).min(3),
  email: z.string().email(),
  description: z.string().max(255),
  photo: z.string(),
});

export const updateMe = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = req.user;

    if (!user.userId) throw new UnathorizedError();

    const data = updateMeDataInput.parse(req.body);

    const updatedUser = await updateUser(user.userId, data);

    return res.status(200).send({
      ...updatedUser,
    });
  } catch (error) {
    next(error);
  }
};
