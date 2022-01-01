// Importing modules
import type { ContentEditorSubscriptionPayload, DeleteContentPayload, InsertContentPayload, ReplaceContentPayload, SubscribePayload, UnsubscribePayload, EActionEventType } from '@app/shared';
import { FetchStore } from 'src/helpers';
import { EditorStore, IEditorStore } from 'src/modules/Editor';
import { events } from 'src/modules/Events';
import { writable } from 'svelte/store';
import { ISessionConnectionStore, SessionConnection } from '../..';

// IEditorContentSubscriptionStore
export interface IEditorContentSubscriptionStore {
  subscribed: boolean;
};

// Function, that'll initialize our store
function _initialize() {
  // Default store object
  const defaultStore: Partial<IEditorContentSubscriptionStore> = {
    subscribed: false,
  };
  const { subscribe: subscribeToStore, update } = writable(defaultStore);

  // Returning subscribe and other methods
  return {
    // public subscribe
    async subscribe() {
      const store: Partial<IEditorContentSubscriptionStore> = await FetchStore(subscribeToStore);
      const session: Partial<ISessionConnectionStore> = await FetchStore(SessionConnection.subscribe);
      const resource: Partial<IEditorStore> = await FetchStore(EditorStore.subscribe);

      if (!store.subscribed && session.socket && resource.resourceId) {
        // Getting socket
        const { socket } = session;

        // > Adding socket listeners
        // > > Insert Content
        socket.on('incoming>editor.content.insertContent', (payload: InsertContentPayload) => {
          // Emitting this event
          console.log('received 1');
          events.emit('editor.content.insertContent', payload);
        });

        // > > Replace Content
        socket.on('incoming>editor.content.replaceContent', (payload: ReplaceContentPayload) => {
          events.emit('editor.content.replaceContent', payload);
        });

        // > > Delete Content
        socket.on('incoming>editor.content.deleteContent', (payload: DeleteContentPayload) => {
          events.emit('editor.content.deleteContent', payload);
        });

        // Subscribing
        socket.emit('subscribe', <SubscribePayload>{
          subscription: {
            name: 'editor::content',
            payload: <ContentEditorSubscriptionPayload>{
              resourceId: resource.resourceId
            },
          }
        });

        // Updating store
        update((object) => {
          object.subscribed = true;

          return object;
        });
      };
    },

    // public push
    async push(
      type: EActionEventType,
      payload: InsertContentPayload | ReplaceContentPayload | DeleteContentPayload,
    ) {
      const store: Partial<IEditorContentSubscriptionStore> = await FetchStore(subscribeToStore);

      if (store.subscribed) {
        // Fetching socket
        const session: Partial<ISessionConnectionStore> = await FetchStore(SessionConnection.subscribe);
        if (!session.socket) return;
        
        const { socket } = session;
        if (type == 'INSERT_CONTENT') {
          socket.emit('editor.content.insertContent', payload);
        } else if (type == 'REPLACE_CONTENT') {
          socket.emit('editor.content.replaceContent', payload);
        } else if (type == 'DELETE_CONTENT') {
          socket.emit('editor.content.deleteContent', payload);
        };
      };
    },

    // public unsubscribe
    async unsubscribe() {
      const store: Partial<IEditorContentSubscriptionStore> = await FetchStore(subscribeToStore);
      
      if (store.subscribed) {
        const session: Partial<ISessionConnectionStore> = await FetchStore(SessionConnection.subscribe);
        if (!session.socket) return;

        // Unsubscribing
        session.socket.emit('unsubscribe', <UnsubscribePayload>{
          subscriptionName: 'editor::content'
        });
      };
    },
  }
};

// Exporting our store
export const EditorContentSubscription = _initialize();