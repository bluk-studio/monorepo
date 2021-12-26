import type { EDashboardType } from '@app/shared';
import { writable } from 'svelte/store';

// IEditorStore interface
export interface IEditorStore {
  // Current resource information
  // +todo
  resourceType: EDashboardType,
  resourceId: string,
};

// Function, that'll initialize our store
function _initialize() {
  // Default store
  const defaultStore: Partial<IEditorStore> = {};

  const { subscribe, update } = writable(defaultStore);

  // Returning subscribe method and all other methods
  return {
    subscribe,

    // update
    async update(
      resourceId: string,
      resourceType: EDashboardType,
    ) {
      update((object) => {
        object.resourceId = resourceId;
        object.resourceType = resourceType;

        return object;
      });
    },
  };
};

export const EditorStore = _initialize();