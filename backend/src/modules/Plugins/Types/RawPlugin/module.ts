import { forwardRef, Module } from '@nestjs/common';
import { GlobalModels } from 'src/bootstrap';
import { ProjectModule } from 'src/modules/Project/module';
import { ProfileModule } from 'src/modules/Profile/module'
import { BasicPluginModule } from 'src/modules/Plugins/Basic/module';
import { AuthModule } from 'src/modules/Auth/module';

import * as Services from './services';
import * as Resolvers from './resolvers';

@Module({
  imports: [GlobalModels, ProjectModule, ProfileModule, forwardRef(() => BasicPluginModule), AuthModule],
  providers: [...Object.values(Services), ...Object.values(Resolvers)],
  exports: [...Object.values(Services)],
})
export class RawPluginModule {};