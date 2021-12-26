import { Module } from '@nestjs/common';
import { GlobalServices, GlobalModels } from 'src/bootstrap';
import { WorkerModule } from 'src/modules/Worker/module';

import * as Services from './services';
import * as Resolvers from 'src/modules/Project/resolvers';

@Module({
  imports: [GlobalModels, WorkerModule],
  providers: [...Object.values(GlobalServices), ...Object.values(Resolvers)],
  exports: [...Object.values(Services)],
})
export class ProjectModule {}
