import { env } from '@/app/env';
import mongoose from 'mongoose';

export const mongoConnection = async () => {
  mongoose.connection.on('error', (err) => {
    console.log(err);
    process.exit(1); // Shutdown the program with an error in database connection occurs
  });

  mongoose
    .connect(env.DATABASE_URL)
    .then(() => console.log('Connected to Mongo'));
};
