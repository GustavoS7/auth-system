import { z } from 'zod';
import 'dotenv/config';

const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'test', 'production'])
    .default('development'),
  PORT: z.coerce.number().default(3333),
  REFRESH_TOKEN_SECRET: z.string(),
  TOKEN_SECRET: z.string(),
  DATABASE_URL: z.string(),
});

const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
  console.error('❌ Invalid environment variables.', _env.error.format());
  throw new Error('Invalid environment variables.');
}

export const env = _env.data;
