import { Module } from '@nestjs/common';
import { GlobalModels } from 'src/bootstrap';
import { ProfileModule } from 'src/modules/Profile/module';
import { AuthModule } from 'src/modules/Auth/module';

import * as Resolvers from './resolvers';
import * as Services from './services';

@Module({
  imports: [GlobalModels, ProfileModule, AuthModule],
  providers: [...Object.values(Services), ...Object.values(Resolvers)],
  exports: [...Object.values(Services)],
})
export class DashboardModule {};