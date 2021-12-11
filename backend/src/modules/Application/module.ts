import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';

import * as GlobalModules from 'src/bootstrap/GlobalModules.array';

// Importing GraphQL enums
import 'src/types/enums';

@Module({
  imports: [
    // ConfigModule
    ConfigModule.forRoot(),

    // MongooseModule
    MongooseModule.forRoot(process.env.MONGO_URL),

    // GraphQLModule
    GraphQLModule.forRoot({
      subscriptions: {
        'graphql-ws': true
      },
      autoSchemaFile: 'schema.gql',
      context: ({ req }) => ({ req }),
      cors: {
        origin:
          process.env.NODE_ENV === 'production'
            ? 'https://www.bluk.studio'
            : 'http://localhost:3000',
        credentials: true,
      },
    }),

    // Application modules
    ...Object.values(GlobalModules),
  ],
})
export class ApplicationModule {}
