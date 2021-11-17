import { writable } from 'svelte/store';
import { client } from 'src/stores/graphql';
import { ProjectById } from 'src/queries';

import type { IProjectByIdData } from 'src/queries';
import type { IProject } from '@app/shared';

export interface ICurrentProjectStore {
  loaded: boolean;
  project: Partial<IProject>;
  state: Object;
}

// Function, that'll initialize our CurrentProject
// store
function _initialize() {
  const defaultStore: ICurrentProjectStore = {
    loaded: false,
    project: {},
    state: {},
  };
  const { subscribe, update } = writable(defaultStore);

  // Function, that'll handle project object update
  function updateProject(project: Partial<IProject>) {
    update((object) => {
      object.loaded = true;
      object.project = project;

      return object;
    });
  };

  // Creating our CurrentProject store
  return {
    subscribe,

    // Function, that'll clear our CurrentProject store
    async clear() {
      updateProject({});
    },

    // Function, that'll fetch information about
    // our project
    async fetch(projectId: string) {
      return new Promise((resolve, reject) => {
        client.query<IProjectByIdData>(ProjectById, { variables: { projectId } }).subscribe((response) => {
          // Waiting for response to finish loading
          if (response.loading) return;
  
          // Checking response
          if (response.error) {
            // +todo
            // error handling and visialization
            console.error('graphql project query error', response.error);
            reject({ error: true });
          } else {
            updateProject(response.data?.Project);
            resolve(response);
          };  
        });
      });
    }

    // Function, that'll subscribe to ProjectState query
  };
};

export const CurrentProject = _initialize();