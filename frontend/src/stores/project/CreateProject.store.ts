// Importing modules
import { writable } from 'svelte/store';
import { client } from 'src/stores/graphql';
import { ProfileProjects } from 'src/stores/project/ProfileProjects.store';
import { CreateProject, ICreateProjectMutationResponse } from 'src/queries';
import type { IProject } from '@app/shared';

// CreateProject Store interface
export interface ICreateProjectStore {
  // +todo
  plan: string;

  name: string;
  description: string;
  members: Array<object>;
};

// Function, that'll create our store
function _initialize() {
  const defaultStore: Partial<ICreateProjectStore> = {};
  const { subscribe, update } = writable(defaultStore);

  return {
    subscribe,

    async create(): Promise<Pick<IProject, '_id'>> {
      const project: Partial<ICreateProjectStore> = await (new Promise((resolve) => {
        subscribe((object) => {
          resolve(object);
        });
      }));
      
      const response = (await client.mutate(CreateProject, { 
          variables: { 
            input: {
              name: project.name,
              description: project.description,
            }
          },
        })) as ICreateProjectMutationResponse;

      // +todo
      ProfileProjects.fetch();

      return response.data.CreateProject;
    },

    // setPlan function
    // +todo
    setPlan(plan: string) {
      update((object) => {
        object.plan = plan;
        return object;
      });
    },

    // setName function
    setName(name: string) {
      update((object) => {
        object.name = name;
        return object;
      });
    },

    // setDescription function
    setDescription(description: string) {
      update((object) => {
        object.description = description;
        return object;
      });
    },
  };
};

export const CreateProjectStore = _initialize();
