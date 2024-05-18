import { login, refreshTokenController, register } from '@/controllers/auth';
import { Router } from 'express';

const authRoute = Router();

authRoute.post('/refreshToken', refreshTokenController);
authRoute.post('/register', register);
authRoute.post('/login', login);

export { authRoute };
