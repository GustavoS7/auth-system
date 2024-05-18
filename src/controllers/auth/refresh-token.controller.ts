import { generateToken, verifyToken } from '@/service/tokens';
import { NextFunction, Request, Response } from 'express';
import { InvalidCredentialsError } from '@/errors';
import { UserModel } from '@/models';
import { env } from '@/app/env';
import { z } from 'zod';
import { findUserById } from '@/service/user';

const refreshTokenDataInput = z.object({
  refreshToken: z.string(),
});

export const refreshTokenController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { refreshToken } = refreshTokenDataInput.parse(req.body);

    const isTokenValid = await verifyToken(refreshToken);

    if (!isTokenValid) throw new InvalidCredentialsError();

    const user = await findUserById(isTokenValid.userId);

    if (!user) throw new InvalidCredentialsError();

    const [accessToken, refreshedToken] = await Promise.all([
      generateToken({ userId: user.id }, '1d', env.TOKEN_SECRET),
      generateToken({ userId: user.id }, '30d', env.REFRESH_TOKEN_SECRET),
    ]);

    return res.status(201).json({
      id: user._id,
      name: user.name,
      email: user.email,
      description: user.description,
      photo: user.photo,
      refreshToken: refreshedToken,
      accessToken,
    });
  } catch (error) {
    next(error);
  }
};
