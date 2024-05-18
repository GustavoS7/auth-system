import { NextFunction, Request, Response } from 'express';
import { generateToken } from '@/service/tokens';
import { signUser } from '@/service/auth';
import { env } from '@/app/env';
import { z } from 'zod';

const loginDataInput = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, password } = loginDataInput.parse(req.body);

    const user = await signUser({ email, password });

    const [accessToken, refreshToken] = await Promise.all([
      generateToken({ userId: user._id }, '1d', env.TOKEN_SECRET),
      generateToken({ userId: user._id }, '30d', env.REFRESH_TOKEN_SECRET),
    ]);

    return res.status(200).json({
      id: user._id,
      name: user.name,
      email: user.email,
      description: user.description,
      photo: user.photo,
      accessToken,
      refreshToken,
    });
  } catch (error) {
    next(error);
  }
};
