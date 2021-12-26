import { Module } from '@nestjs/common';
import { GlobalModels } from 'src/bootstrap';
import { ProjectModule } from 'src/modules/Project/module';

import * as Services from './services';
import * as Resolvers from './resolvers';

@Module({
  imports: [GlobalModels, ProjectModule],
  providers: [...Object.values(Services), ...Object.values(Resolvers)],
  exports: [...Object.values(Services)],
})
export class RawPluginModule {};