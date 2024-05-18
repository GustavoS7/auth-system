import { InvalidCredentialsError } from '@/errors';
import { UserModel } from '@/models';
import bcrypt from 'bcrypt';

interface IsignUser {
  email: string;
  password: string;
}

export const signUser = async ({ email, password }: IsignUser) => {
  const user = await UserModel.findOne({ email: email.toLowerCase() }).lean();

  if (!user) throw new InvalidCredentialsError();

  const passwordMatches = await bcrypt.compare(password, user.password);

  if (!passwordMatches) throw new InvalidCredentialsError();

  return user;
};
