import { Module } from '@nestjs/common';
import { AuthModule } from 'src/modules/Auth/module';
import { ProjectModule } from 'src/modules/Project/module';
import { RawPluginModule } from 'src/modules/Plugins/Types/RawPlugin/module';
import { ProfileModule } from 'src/modules/Profile/module';
import { ScheduleModule } from '@nestjs/schedule';
import { SessionConnectionModule } from '../Session/module';
import { EventEmitterModule } from '@nestjs/event-emitter';

import * as Services from './services';
import * as Gateways from './gateways';

@Module({
  imports: [
    ProjectModule, 
    AuthModule, 
    RawPluginModule,
    ProfileModule,
    SessionConnectionModule,
    
    // EventsEmitter
    EventEmitterModule.forRoot(),

    ScheduleModule.forRoot(),
  ],
  providers: [...Object.values(Gateways), ...Object.values(Services)],
  exports: [...Object.values(Services)],
})
export class EditorModule {};