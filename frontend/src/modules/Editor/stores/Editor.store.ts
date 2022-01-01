import type { EDashboardType, EResourceType, IEditorCollaborator, IEditorContentChange, IEditorStatusBar } from '@app/shared';
import { CurrentDashboardStore } from 'src/modules/Dashboards';
import { writable } from 'svelte/store';
import { client, subscriptionClient, editorPingClient } from '$stores/graphql';
import { EditorSessionSubscription, IEditorSessionSubscriptionData, IPingEditorSessionData, PingEditorSession } from '../queries';
import { CurrentProfile, ICurrentProfile } from '$stores/profile';


// IEditorStore interface
export interface IEditorStore {
  // Resource
  resourceType: EResourceType,
  resourceId: string,

  // Dashboard
  dashboardType: EDashboardType,
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
      resourceType: EResourceType,
    ) {
      update((object) => {
        object.resourceId = resourceId;
        object.resourceType = resourceType;

        // Determining dashboardType
        if (resourceType == 'NODE_PLUGIN' || resourceType == 'RAW_PLUGIN') {
          object.dashboardType = 'CODE_EDITOR' as EDashboardType;
        } else if (resourceType == 'PROJECT') {
          object.dashboardType = 'PROJECT' as EDashboardType;
        } else if (resourceType == 'VISUAL_PLUGIN') {
          object.dashboardType = 'VISUAL_EDITOR' as EDashboardType;
        };

        // Trying to fetch CurrentDashboard information
        CurrentDashboardStore.fetch(object.dashboardType, resourceId);
        
        return object;
      });
    },

    // public clear
    clear() {
      update(() => {
        return {};
      });
    },
  };
};

export const EditorStore = _initialize();