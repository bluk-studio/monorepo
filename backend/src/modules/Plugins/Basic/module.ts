import { forwardRef, Module } from '@nestjs/common';
import { RawPluginModule } from 'src/modules/Plugins/Types/RawPlugin/module';
import { ProjectModule } from 'src/modules/Project/module';
import { AuthModule } from 'src/modules/Auth/module';

import * as Services from './services';
import * as Resolvers from './resolvers';

@Module({
  imports: [forwardRef(() => RawPluginModule), ProjectModule, AuthModule],
  providers: [...Object.values(Services), ...Object.values(Resolvers)],
  exports: [...Object.values(Services)],
})
export class BasicPluginModule {};