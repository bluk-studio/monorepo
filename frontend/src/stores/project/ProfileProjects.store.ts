import { writable } from "svelte/store";
// import { CurrentProfile } from "src/stores";
import type { IProject } from '@app/shared';
import { client } from 'src/stores/graphql';
import type { IProfileProjectsData } from "src/queries";
import { ProfileProjects as ProfileProjectsQuery } from 'src/queries';

export interface IProfileProjectsStore {
  loaded: boolean;
  list: Array<IProject>;
};

// Function, that'll initialize our ProfileProjects store
function _initialize() {
  const defaultStore = {
    loaded: false,
    list: [],
  };
  const { subscribe, update } = writable(defaultStore);

  // Function, that'll handle project list update process
  function updateList(projects: IProject[]) {
    update((object) => {
      object.loaded = true;
      object.list = projects;

      return object;
    });
  };

  return {
    subscribe,

    // Function, that'll fetch projects
    async fetch() {
      // Fetching ProfileProjects
      return new Promise((resolve, reject) => {
        client.query<IProfileProjectsData>(ProfileProjectsQuery).subscribe((response) => {
          // Waiting for response to finish loading
          if (response.loading) return;
  
          // Checking response
          if (response.error) {
            // +todo
            // error handling and visialization
            console.error('graphql profileprojects query error', response.error);
            reject({ error: true });
          } else {
            updateList(response.data?.ProfileProjects);
            resolve(response);
          };  
        });
      });
    },
  }
};

export const ProfileProjects = _initialize();