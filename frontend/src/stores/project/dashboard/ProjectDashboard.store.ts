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
  projectId: Types.ObjectId | string;
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
      object.projectId = store.projectId ?? object.projectId;
      object.widgets = store.widgets;
      return object;
    });
  };

  // fetch function
  function fetchDashboard(projectId: string) {
    return new Promise((resolve, reject) => {
      const query = client.query<ICurrentDashboardConfigData>(CurrentDashboardConfig, { variables: { projectId } })

      // Refetching
      query.refetch();

      // Making new request
      query.subscribe((response) => {
        // Waiting for response to finish loading
        if (response.loading) return;

        // Checking response
        if (response.error) {
          // +todo
          // error handling and visialization
          console.error('graphql project query error', response.error);
          reject({ error: true });
        } else {
          updateStore({ ...response.data.CurrentProjectDashboard, projectId });
          resolve(response);
        };  
      });
    });
  };

  return {
    subscribe,

    async refetch() {
      console.log('refetch');
      const dashboard: Partial<IProjectDashboardStore> = await new Promise((resolve) => {
        subscribe((object) => {
          resolve(object);
        });
      });

      console.log(dashboard);
      // Fetching
      return await fetchDashboard(String(dashboard.projectId));
    },

    // fetchDashboardConfig
    async fetch(projectId: string) {
      console.log('fetch dashboard');
      return await fetchDashboard(projectId);
    },

    // updateLayout
    async updateLayout(dashboardId: string, widgets: IDashboardWidget[]) {
      const response = (await client.mutate(UpdateProjectDashboard, { 
        variables: {
          dashboardId,
          input: {
            widgets: widgets.map((widget) => {
              return {
                type: widget.type,
                x: widget.x,
                y: widget.y,
                width: widget.width,
                height: widget.height,
              };
            }),
          }
        },
      })) as IUpdateProjectDashboardResponse;

      return response.data.UpdateProjectDashboard;
    },
  }
};

// Exporting our store
export const ProjectDashboard = _initialize();