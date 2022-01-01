// Importing modules
import type { IRawPlugin } from '@app/shared';
import { writable } from 'svelte/store';

import { client } from 'src/stores/graphql';
import { IRawPluginsByProjectData, RawPluginsByProfile, RawPluginsByProject } from '../queries';
import type { IRawPluginsByProfileData } from '../queries';
import { CurrentProject, ICurrentProjectStore } from '$stores/project';

// IRawPluginsStore interface
export interface IRawPluginsStore {
  list: Array<Pick<IRawPlugin, '_id' | 'title' | 'description'>>
};

// Function, that'll initialize our store
function _initialize() {
  // Default store
  const defaultStore: Partial<IRawPluginsStore> = {};
  const { subscribe, update } = writable(defaultStore);

  // reusable fetch function
  async function fetchPlugins(type: 'PROFILE' | 'PROJECT', includeProjectPlugins?: boolean) {
    // Query
    let query;
    if (type == 'PROFILE') {
      query = client.query<IRawPluginsByProfileData>(RawPluginsByProfile(includeProjectPlugins))
    } else {
      // Fetching current project id
      const { project }: ICurrentProjectStore = await new Promise((resolve) => {
        CurrentProject.subscribe((object) => {
          resolve(object);
        });
      });

      // +todo error handling
      if (!project?._id) return;

      query = client.query<IRawPluginsByProjectData>(RawPluginsByProject(), {
        variables: {
          projectId: String(project._id)
        }
      });
    };

    // Refetching
    query.refetch();

    // Subscribing to this store
    query.subscribe((response) => {
      // Waiting for response to load
      if (response.loading) return;

      // Checking response
      if (response.error) {
        // +todo error handling
      } else {
        // Updating store
        update((object) => {
          object.list = response.data?.RawPluginsByProfile ?? response.data?.RawPluginsByProject;
          
          return object;
        });
      };
    });
  };

  // Returning subscribe and other store methods
  return {
    subscribe,

    // public clear
    clear() {
      update((object) => {
        object.list = [];

        return object;
      });
    },

    // public fetch
    async fetch(type: 'PROFILE' | 'PROJECT', includeProjectPlugins?: boolean) {
      await fetchPlugins(type, includeProjectPlugins);
    },

    // public refetch
    async refetch(type: 'PROFILE' | 'PROJECT', includeProjectPlugins?: boolean) {
      await fetchPlugins(type, includeProjectPlugins);
    },
  };
};

// Exporting our RawPlugins store
export const RawPluginsStore = _initialize();