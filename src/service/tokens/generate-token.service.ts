import jwt from 'jsonwebtoken';

export const generateToken = async (
  payload: any,
  expiresIn: string,
  secret: string,
) => {
  const token = jwt.sign(payload, secret, {
    expiresIn,
  });

  return token;
};
