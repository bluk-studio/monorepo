import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';

@Injectable()
export class GatewayListenerService implements OnApplicationBootstrap {
  // Logger
  private readonly logger = new Logger(GatewayListenerService.name);
  
  // application bootstrap event
  async onApplicationBootstrap() {
    this.logger.debug('Starting GatewayListener service');
  };
};