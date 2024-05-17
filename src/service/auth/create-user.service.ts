import { UserModel } from '@/models/user-model';

interface IcreateUserData {
  name: string;
  email: string;
  password: string;
  description?: string;
  photo?: string;
}

export const createUser = async ({
  email,
  name,
  password,
  description,
  photo,
}: IcreateUserData) => {
  const user = await UserModel.findOne({ email });

  if (user) throw new Error();

  return user;
};
