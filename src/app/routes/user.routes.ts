import { me, deleteMe, updateMe, listUsers } from '@/controllers/user';
import { authMiddleware } from '../middleware';
import { Router } from 'express';

const userRoute = Router();

userRoute.get('/listFriends', authMiddleware, listUsers);
userRoute.post('/update', authMiddleware, updateMe);
userRoute.get('/delete', authMiddleware, deleteMe);
userRoute.get('/me', authMiddleware, me);

export { userRoute };
