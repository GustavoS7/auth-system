import { me, deleteMe, updateMe } from '@/controllers/user';
import { authMiddleware } from '../middleware';
import { Router } from 'express';
import { listFriends } from '@/controllers/user/list-friends';

const userRoute = Router();

userRoute.get('/listFriends', authMiddleware, listFriends);
userRoute.post('/update', authMiddleware, updateMe);
userRoute.get('/delete', authMiddleware, deleteMe);
userRoute.get('/me', authMiddleware, me);

export { userRoute };
