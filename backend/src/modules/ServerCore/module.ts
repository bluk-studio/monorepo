import { Module } from '@nestjs/common';

// Importing modules
import { GatewayModule } from './Gateway/module';

@Module({
  imports: [GatewayModule],
})
export class ServerCoreModule {};