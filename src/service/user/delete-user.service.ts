import { UserModel } from '@/models';

export const deleteUser = async (id: string) => {
  const user = await UserModel.deleteOne({ _id: id });

  return user;
};
