import { Module } from '@nestjs/common';

import { GlobalServices, GlobalModels } from 'src/bootstrap';
import * as Resolvers from 'src/modules/Project/resolvers';

@Module({
  imports: [GlobalModels],
  providers: [...Object.values(GlobalServices), ...Object.values(Resolvers)],
})
export class ProjectModule {}
