import { Module } from '@nestjs/common';
import { AuthModule } from 'src/modules/Auth/module';

import * as Gateways from './gateways';
import * as Services from './services';  

@Module({
  imports: [
    AuthModule
  ],
  providers: [...Object.values(Gateways), ...Object.values(Services)],
  exports: [...Object.values(Services)],
})
export class SessionConnectionModule {};