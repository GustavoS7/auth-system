import { UnathorizedError } from '@/errors';
import { UserModel } from '@/models';

export const findUserById = async (id: string) => {
  const user = await UserModel.findById(id);

  if (!user) throw new UnathorizedError();

  return user;
};
