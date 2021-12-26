import type { EWorkerState } from '@app/shared';
import { writable } from 'svelte/store';
import { client } from 'src/stores/graphql';
import { ICurrentWorkerStateData, ICurrentWorkerStateResponse, SubscribeToWorkerState } from 'src/queries';
import { CurrentProfile } from '..';

// CurrentWorkerState store
interface CurrentWorkerStateStore {
  loaded: boolean;
  state: EWorkerState
};

// Function, that'll create our store
function _initialize() {
  const defaultStore: CurrentWorkerStateStore = {
    loaded: false,
    state: 'DEAD' as EWorkerState,
  };

  const { subscribe, update } = writable(defaultStore);

  // Function, that'll update our store
  function updateStore(store: Partial<CurrentWorkerStateStore>) {
    update((object) => {
      object.loaded = true;

      return {
        ...object,
        ...store,
      }
    });
  };

  // Returning subscribe method and all other methods
  return {
    subscribe,

    // fetch and subscribe method
    async fetch(projectId: string) {
      // Fetching current profile's token
      const profileToken = await (new Promise((resolve) => {
        CurrentProfile.subscribe((store) => {
          if (store.loggedIn) {
            resolve(store.profile.token);
          };
        });
      }));
      
      // Subscribing to this graphql subscription
      const subscription = client.subscribe<ICurrentWorkerStateData>(SubscribeToWorkerState, {
        variables: {
          projectId: projectId,
          token: profileToken,
        }
      });
      
      // Subscribing to updates
      subscription.subscribe((response) => {
        console.log('response:');
        console.log(response);
        if (response.loading) return;
        
        // Updating store
        updateStore(response.data.CurrentWorkerState);
      });
    },
  };
};

export const CurrentWorkerState = _initialize();