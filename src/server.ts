import { app } from './app';
import { env } from './app/env';
import { mongoConnection } from './database/mongo-connection';

mongoConnection().then(() =>
  app.listen(env.PORT, () => console.log('✅ Server is runnig on ' + env.PORT)),
);
