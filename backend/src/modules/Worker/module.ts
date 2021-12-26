import { Module } from '@nestjs/common';
import { GlobalModels, GlobalServices } from 'src/bootstrap';
import { PubSub } from 'graphql-subscriptions';
import { RegionModule } from 'src/modules/Region/module';

import * as Services from './services';
import * as Resolvers from './resolvers';

const Subscription = {
  provide: 'PUB_SUB',
  useValue: new PubSub(),
};

@Module({
  imports: [GlobalModels, RegionModule],
  providers: [
    ...Object.values(Services), 
    ...Object.values(Resolvers),
    ...Object.values(GlobalServices),
    Subscription,
  ],
  exports: [
    ...Object.values(Services),
    Subscription,
  ],
})
export class WorkerModule {}