import { UnathorizedError } from '@/errors';
import { UserModel } from '@/models';

type TUpdateUserData = {
  name?: string;
  description?: string;
  photo?: string;
  email?: string;
};

export const updateUser = async (id: string, data: TUpdateUserData) => {
  const user = await UserModel.updateOne(
    {
      _id: id,
    },
    data,
  );

  if (!user) throw new UnathorizedError();

  return user;
};
