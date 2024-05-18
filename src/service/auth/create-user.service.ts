import { AppError } from '@/errors/app-error';
import { UserModel } from '@/models';

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

  if (user) throw new AppError('User already exists');

  const newUser = await new UserModel({
    name,
    email,
    password,
    description,
    photo,
  }).save();

  return newUser;
};
