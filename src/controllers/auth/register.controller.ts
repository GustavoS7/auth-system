import { NextFunction, Request, Response } from 'express';
import { createUser } from '@/service/auth';
import { z } from 'zod';

const registerDataInput = z.object({
  name: z.string().max(255).min(3),
  email: z.string().email(),
  description: z.string().max(255).optional(),
  photo: z.string().optional(),
  password: z.string().min(8).max(16),
});

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, name, password, description, photo } =
      registerDataInput.parse(req.body);

    const newUser = await createUser({
      email,
      name,
      password,
      description,
      photo,
    });

    const [accessToken, refreshToken] = await Promise.all([]);

    return res.status(201).json({});
  } catch (error) {
    return next(error);
  }
};
