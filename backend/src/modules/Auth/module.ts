import { Module } from '@nestjs/common';

// Importing Global Services and Global Models
import { GlobalModels, GlobalServices } from 'src/bootstrap';

import * as Resolvers from './resolvers';
import * as Services from './services';


@Module({
  imports: [GlobalModels],
  providers: [...Object.values(GlobalServices), ...Object.values(Resolvers)],
  exports: [...Object.values(Services)],
})
export class AuthModule {}
