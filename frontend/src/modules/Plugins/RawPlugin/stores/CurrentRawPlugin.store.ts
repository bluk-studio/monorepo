// Importing modules
import { writable } from 'svelte/store';
import { client } from 'src/stores/graphql';
import { IRawPluginByIdData, IUpdateRawPluginCodeData, RawPluginById, UpdateRawPluginCode } from '../queries';
import { EditorStore, IEditorStore } from 'src/modules/Editor';
import { CurrentProject } from '$stores/project';
import { CurrentProfile, ICurrentProfile } from '$stores/profile';
import type { IContentChange, IExecutionResult, IParsedContentChange } from '@app/shared';

// ICurrentRawPlugin interface
export interface ICurrentRawPluginStore {
  id: string,
  title: string,
  description?: string,
  projectId?: string,

  // Code-related
  code: string[],
  updatingCode: boolean,
};

// Function, that'll create our store
function _initialize() {
  // Default store object
  const defaultStore: Partial<ICurrentRawPluginStore> = {};
  const { subscribe, update } = writable(defaultStore);

  // fetchPlugin function
  async function fetchPlugin() {
    // Fetching current plugin id through EditorStore
    const editor: Partial<IEditorStore> = await new Promise((resolve) => {
      EditorStore.subscribe((object) => {
        resolve(object);
      });
    });

    // Query
    const query = client.query<IRawPluginByIdData>(RawPluginById(), {
      variables: {
        pluginId: editor.resourceId,
      },
    });

    // Refetching
    query.refetch();

    // Subscribing
    query.subscribe((response) => {
      // Waiting for response to load
      if (response.loading) return;

      // Checking response
      if (response.error) {
        // +todo error handling
      } else {
        // Updating our store
        update((object) => {
          // Clearing object
          object = {};
          
          // Updating with new information
          object.id = String(response.data?.RawPluginById._id);
          object.title = response.data?.RawPluginById.title;
          object.description = response.data?.RawPluginById.description;
          object.code = response.data?.RawPluginById.code;

          // Updating current project (if set)
          if (response.data?.RawPluginById.project?._id != null) {
            const projectId = response.data?.RawPluginById.project?._id;
            CurrentProject.fetch(String(projectId));

            object.projectId = String(projectId);
          };

          return object;
        });
      };
    });
  };

  // Returning subscribe and other store-related methods
  return {
    subscribe,

    // public fetch
    fetch() {
      fetchPlugin();
    },

    // public refetch
    refetch() {
      fetchPlugin();
    },

    // public update

    // public pushChange
    async pushChange(changes: IContentChange[]) {
      // Getting current plugin id
      const plugin: Partial<ICurrentRawPluginStore> = await new Promise((resolve) => {
        subscribe((object) => {
          resolve(object);
        });
      }); 

      // Getting account token
      const profile: Partial<ICurrentProfile> = await new Promise((resolve) => {
        CurrentProfile.subscribe((object) => {
          resolve(object);
        });
      });

      // +todo error handling
      if (!plugin.id || !profile.profile?.token) return

      // Subscribing to UpdatePluginCode subscription and monitoring it
      await client.mutate<IUpdateRawPluginCodeData>(UpdateRawPluginCode(), {
        variables: {
          pluginId: String(plugin.id),
          changes
        },
      }) as IExecutionResult<IUpdateRawPluginCodeData>;
    },
  };
};

// Exporting our store
export const CurrentRawPluginStore = _initialize();