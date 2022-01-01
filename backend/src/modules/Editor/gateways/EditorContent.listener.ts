import { Injectable, OnApplicationBootstrap, Logger } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { ModuleRef } from '@nestjs/core';
import { GatewayListeners, RawListener, SessionClientService } from 'src/modules/Session/services';
import { Socket } from 'socket.io';
import { ContentEditorSubscriptionPayload, DeleteContentPayload, EActionEventType, InsertContentPayload, PingCollaboratorPayload, ReplaceContentPayload } from '@app/shared';
import { EditorSessionService } from '../services';

@Injectable()
export class ContentEditorListener implements OnApplicationBootstrap, RawListener {
  constructor(
    private readonly clientService: SessionClientService,
    private readonly events: EventEmitter2,
    
    private readonly service: EditorSessionService,

    private readonly moduleRef: ModuleRef,
    private readonly listeners: GatewayListeners,
  ) {}
  
  // Logger
  private readonly logger = new Logger(ContentEditorListener.name);
  
  // On Bootstrap event
  onApplicationBootstrap() {
    // Adding this module to GatewayListener array
    this.listeners.addListener(this.moduleRef.get(ContentEditorListener));
  };

  public subscriptionName = "editor::content";

  // public handleSubscriber()
  async handleSubscriber(client: Socket) {
    console.log("handling new subscriber");
    // Adding event listeners
    this._addIncomingListeners(client);
  };

  // private _addIncomingListeners
  private _addIncomingListeners(socket: Socket) {
    // Listening to ping events
    socket.on('editor.ping', async (payload: PingCollaboratorPayload) => {
      // Checking if user is subscribed
      if (!this._isSubscribed(socket.id)) return;
      
      // Fetching client
      const client = await this.clientService.fetchById(socket.id);
      
      // Letting EditorSession service to acknowlege this ping
      // event
      await this.service.addCollaborator(client.uid, payload?.resourceId);
    });

    // > Listening to content-related events
    // > > Insert Content
    socket.on('editor.content.insertContent', async (payload: InsertContentPayload) => {
      // Checking if this user is subscribed
      if (!this._isSubscribed(socket.id)) return;
      
      // Emitting application-scoped InsertContent event
      this.events.emit('editor.content', {
        type: EActionEventType.INSERT_CONTENT,
        payload,
      });
    });

    // > > Replace Content
    socket.on('editor.content.replaceContent', async (payload: ReplaceContentPayload) => {
      // Checking if this user is subscribed
      if (!this._isSubscribed(socket.id)) return;

      // Emitting application-scoped InsertContent event
      this.events.emit('editor.content', {
        type: EActionEventType.REPLACE_CONTENT,
        payload,        
      });
    });

    // > > Delete Content
    socket.on('editor.content.deleteContent', async (payload: DeleteContentPayload) => {
      // Checking if this user is subscribed
      if (!this._isSubscribed(socket.id)) return;

      // Emitting application-scoped InsertContent event
      this.events.emit('editor.content', {
        type: EActionEventType.DELETE_CONTENT,
        payload,
      });
    });
  };

  // Listening to application-scoped InsertContent, ReplaceContent and DeleteContent
  // events
  @OnEvent('editor.content')
  async handleEvent(event: {
    type: EActionEventType,
    payload: DeleteContentPayload | InsertContentPayload | ReplaceContentPayload,
  }) {
    const resourceId = event.payload?.resourceId;
    if (!resourceId) return;

    // Fetching all clients, which are subscribed
    // to this listener
    const clients = await this.clientService.fetchSubscribers(this.subscriptionName);

    const collaborators = clients.filter((client) => {
      const subscription = client.subscriptions.find((subscription) => subscription.name == this.subscriptionName);
      const payload: ContentEditorSubscriptionPayload = subscription.payload;

      return payload.resourceId == resourceId;
    });

    console.log('collaborators:');
    console.log(collaborators);

    // Determining actionType
    let actionType;
    switch (event.type) {
      case EActionEventType.INSERT_CONTENT:
        actionType = 'insertContent'
        break;
    
      case EActionEventType.REPLACE_CONTENT:
        actionType = 'replaceContent'
        break;

      case EActionEventType.DELETE_CONTENT:
        actionType = 'deleteContent'
        break;
    }

    console.log('action type:', actionType);

    // Sending this payload to every collaborator
    collaborators.map((client) => client.socket).forEach((socket) => {
      console.log('send to socket', socket.id);
      socket.emit(`incoming>editor.content.${ actionType }`, event.payload);
    });
  };

  // private _isSubscribed
  private async _isSubscribed(id: string): Promise<Boolean> {
    const isAuthorized = await this.clientService.isAuthorized(id);
    const isSubscribed = await this.clientService.isSubscribedTo(id, this.subscriptionName);

    return isAuthorized ? isSubscribed : false;
  };
};