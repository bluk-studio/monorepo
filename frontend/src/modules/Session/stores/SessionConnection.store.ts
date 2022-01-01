import { FetchStore } from 'src/helpers';
import { writable } from 'svelte/store';
import { io } from 'socket.io-client';
import type { Socket } from 'socket.io-client';
import type { AuthorizePayload } from '@app/shared';
import { CurrentProfile, ICurrentProfile } from '$stores/profile';

// ISessionConnectionStore interface
export interface ISessionConnectionStore {
  initialized: boolean,
  connected: boolean,

  socket: Socket
};

// Function, that'll create our store
function _initialize() {
  // Default store
  const defaultStore: Partial<ISessionConnectionStore> = {
    initialized: false,
    connected: false,
  };
  const { subscribe, update } = writable(defaultStore);

  // Returning subscribe and other methods
  return {
    subscribe,

    // public initialize
    async initialize() {
      console.log('initialize');
      const store: Partial<ISessionConnectionStore> = await FetchStore(subscribe);
    
      if (!store.initialized) {
        // Initializing new socket connection
        // +todo production
        const socket = io('http://localhost:3001');

        // > Adding listeners
        // > > Listening to connect event
        // to send authorize event to server
        socket.on('connect', async () => {
          const profile: Partial<ICurrentProfile> = await FetchStore(CurrentProfile.subscribe);
          
          // Sending authorization event
          socket.emit('authorize', <AuthorizePayload>{
            token: profile?.profile?.token,
          });
        });

        // > > Listening to authorized event
        socket.on('authorized', () => {
          // Updating store
          update((object) => {
            object.connected = true;

            return object;
          });
        });

        // > > Listening to disconnect event
        socket.on('disconnect', () => {
          // Updating store
          update((object) => {
            object.connected = false;

            return object;
          });
        });

        socket.on('error', () => {
          console.log('socket error');
        });

        // Updating our store
        update((object) => {
          object.initialized = true;
          object.socket = socket;

          return object;
        });
      };
    },

    // public requestSubscription
    
    // public removeSubscription
  };
};

// Exporting our store
export const SessionConnection = _initialize();