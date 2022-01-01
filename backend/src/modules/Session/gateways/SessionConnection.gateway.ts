import { WebSocketGateway, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage } from '@nestjs/websockets';
import { SessionClientService, GatewayListeners } from 'src/modules/Session/services';
import { Socket } from 'socket.io';
import { AuthorizePayload, SubscribePayload, UnsubscribePayload } from '@app/shared';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class SessionConnectionGateway implements OnGatewayConnection {
  constructor(
    private readonly service: SessionClientService,
    private readonly listeners: GatewayListeners,
  ) {}

  // Handling incoming connection
  async handleConnection(socket: Socket) {
    await this.service.addClient(socket);
  };

  // Authorize action
  @SubscribeMessage('authorize')
  async handleAuthorization(client: Socket, data: AuthorizePayload) {
    console.log('authorize');
    console.log(data);
    await this.service.authorize(client, data);
  };

  // Subscribe action
  @SubscribeMessage('subscribe')
  async handleSubscribe(client: Socket, data: SubscribePayload) {
    console.log('subscribe');
    // Checking if authorized
    if (await this.service.isAuthorized(client.id)) {
      // Checking if this subscription exists
      const listener = this.listeners.listeners.find((x) => x.subscriptionName == data?.subscription.name); 
      if (listener) {
        // Adding this subscription
        await this.service.addSubscription(client.id, data.subscription);
        
        listener.handleSubscriber(client);
      };
    };
  };

  // Unsubscribe action
  @SubscribeMessage('unsubscribe')
  async handleUnsubscribe(client: Socket, data: UnsubscribePayload) {
    // Removing this subscription from this client
    await this.service.removeSubscription(client.id, data?.subscriptionName);
  };
};