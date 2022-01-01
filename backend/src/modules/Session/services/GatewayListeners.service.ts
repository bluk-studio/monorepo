import { Injectable, Logger } from '@nestjs/common';
import { Socket } from 'socket.io';

// RawListener class
export class RawListener {
  public subscriptionName: string;

  handleSubscriber: (client: Socket) => any;
};

// Exporting GatewayListeners
@Injectable()
export class GatewayListeners {
  // Array of connector classes
  public readonly listeners: RawListener[] = [];

  // Logger
  private readonly logger = new Logger(GatewayListeners.name);

  // public addListener
  public addListener(listener: RawListener) {
    // Logging
    this.logger.warn(`Added new listener for ${ listener.subscriptionName } subscription to GatewayListeners`)

    // Pushing
    this.listeners.push(listener);
  };
};