import { AuthorizePayload, IClientSubscription } from '@app/shared';
import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import { AuthService } from 'src/modules/Auth/services';

// RawClient interface
interface RawClient {
  id: string,
  socket: Socket,
  authorized: boolean,
  uid?: string;
  subscriptions: IClientSubscription[],
};

// Exporting SessionClient service
@Injectable()
export class SessionClientService {
  constructor(
    private readonly authService: AuthService,
  ) {}

  // Connected clients array
  public clients: RawClient[] = [];

  // public addClient
  public async addClient(socket: Socket) {
    const client: RawClient = {
      id: socket.id,
      socket: socket,
      authorized: false,
      subscriptions: [],
    };

    // Adding this client
    this.clients.push(client);
  };

  // public fetchById
  public async fetchById(id: string): Promise<RawClient> {
    let client = this.clients.find((x) => x.id == id);

    return client;
  };

  // public update
  public async updateOne(id: string, data: Partial<RawClient>) {
    const client = await this.fetchById(id);
    if (!client) return; 

    this.clients[this.clients.findIndex((x) => x.id == client.id)] = {
      ...client,
      ...data,
    };
  };

  // public authorize
  public async authorize(socket: Socket, payload: AuthorizePayload) {
    const client = await this.fetchById(socket.id);
    if (!client) return; 

    if (!client.authorized) {
      // Trying to authorize this client
      const profile = await this.authService.authorize(payload?.token);
      if (!profile) return;

      // Updating this client
      await this.updateOne(socket.id, {
        authorized: true,
        uid: String(profile._id),
      });

      console.log('authorized');

      // Sending response
      socket.emit('authorized');
    };
  };

  // public async isAuthorized
  public async isAuthorized(id: string): Promise<boolean> {
    const client = await this.fetchById(id);
    if (!client) return; 

    return client.authorized ?? false;
  };

  // public handleDisconnect

  // public fetchSubscribers
  public async fetchSubscribers(subscriptionName: string): Promise<RawClient[]> {
    return this.clients.filter((client) => {
      const subscriptions = client.subscriptions;

      if (subscriptions.find((subscription) => subscription.name == subscriptionName)) {
        return true;
      } else {
        return false;
      };
    });
  };
  
  // public addSubscription
  public async addSubscription(id: string, subscription: IClientSubscription) {
    const client = await this.fetchById(id);
    if (!client) return; 

    const subscriptions = client.subscriptions;
    
    if (!subscriptions.find((x) => x.name == subscription.name)) {
      // Adding this subscription
      // +todo check subscription payload properly
      if (!subscription.payload) return;

      subscriptions.push(subscription);
      
      // Updating
      await this.updateOne(id, { subscriptions });
    };
  };
  
  // public removeSubscription
  public async removeSubscription(id: string, subscriptionName: string) {
    const client = await this.fetchById(id);
    if (!client) return; 

    const subscriptions = client.subscriptions;

    await this.updateOne(id, {
      subscriptions: subscriptions.filter((x) => x.name != subscriptionName),
    });
  };

  // public isSubscribedTo
  public async isSubscribedTo(id: string, subscriptionName: string): Promise<boolean> {
    const client = await this.fetchById(id);
    if (!client) return; 

    const subscriptions = client.subscriptions;

    return Boolean(subscriptions.find((x) => x.name == subscriptionName));
  };
};