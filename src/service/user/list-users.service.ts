import { UserModel } from '@/models';

export const listUsers = async () => {
  const users = await UserModel.find();

  return users;
};
