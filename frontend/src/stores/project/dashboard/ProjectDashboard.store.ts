import { writable } from "svelte/store";
import { client } from 'src/stores/graphql';
import { CurrentDashboardConfig, UpdateProjectDashboard } from 'src/queries';

import type { Types } from "mongoose";
import type { ICurrentDashboardConfigData } from 'src/queries';
import type { IDashboardWidget } from '@app/shared';
import type { IUpdateProjectDashboardResponse } from "src/queries";

// Store interface
export interface IProjectDashboardStore {
  _id: Types.ObjectId,
  widgets: IDashboardWidget[],
};

// Function, that'll create our store
function _initialize() {
  const defaultStore: Partial<IProjectDashboardStore> = {
    widgets: [],
  };
  const { subscribe, update } = writable(defaultStore);

  function updateStore(store: Partial<IProjectDashboardStore>) {
    update((object) => {
      object._id = store._id,
      object.widgets = store.widgets;
      return object;
    });
  };

  return {
    subscribe,

    // fetchDashboardConfig
    async fetch(projectId: string) {
      return new Promise((resolve, reject) => {
        client.query<ICurrentDashboardConfigData>(CurrentDashboardConfig, { variables: { projectId } }).subscribe((response) => {
          // Waiting for response to finish loading
          if (response.loading) return;
  
          // Checking response
          if (response.error) {
            // +todo
            // error handling and visialization
            console.error('graphql project query error', response.error);
            reject({ error: true });
          } else {
            updateStore(response.data.CurrentProjectDashboard);
            resolve(response);
          };  
        });
      });
    },

    // updateLayout
    async updateLayout(dashboardId: string, widgets: IDashboardWidget[]) {
      const response = (await client.mutate(UpdateProjectDashboard, { 
        variables: {
          dashboardId,
          input: {
            widgets
          }
        },
      })) as IUpdateProjectDashboardResponse;

      return response.data.UpdateProjectDashboard;
    },
  }
};

// Exporting our store
export const ProjectDashboard = _initialize();