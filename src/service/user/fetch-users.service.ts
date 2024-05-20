import { UserModel } from '@/models';

export const fetchUsers = async () => {
  const users = await UserModel.find();

  return users;
};
