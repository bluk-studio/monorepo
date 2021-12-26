import { Module } from '@nestjs/common';
import { GlobalServices, GlobalModels } from 'src/bootstrap';

import * as Resolvers from 'src/modules/Profile/resolvers';
import * as Services from './services';

@Module({
  imports: [GlobalModels],
  providers: [...Object.values(GlobalServices), ...Object.values(Resolvers)],
  exports: [...Object.values(Services)],
})
export class ProfileModule {}
