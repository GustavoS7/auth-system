import express, { NextFunction, Request, Response } from 'express';
import { AppError, NotFoundError } from '@/errors';
import { authRoute, userRoute } from './routes';
import { ZodError } from 'zod';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/auth', authRoute);
app.use('/user', userRoute);

app.use(async (req, res, next) => {
  next(new NotFoundError());
});

app.use(async (err: any, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.status).send({
      message: err.message,
    });
  }
  if (err instanceof ZodError) {
    return res.status(400).send({
      message: err.flatten(),
    });
  }
  return res.status(err.status || 500).send({
    message: err.message,
  });
});

export { app };
