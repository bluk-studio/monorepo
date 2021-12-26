import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';

import * as Services from './services';

@Module({
  imports: [
    // Schedule Module
    ScheduleModule.forRoot(),
  ],
  providers: [...Object.values(Services)],
  exports: [...Object.values(Services)],
})
export class RegionModule {};