// Importing modules
import { writable } from 'svelte/store';

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
