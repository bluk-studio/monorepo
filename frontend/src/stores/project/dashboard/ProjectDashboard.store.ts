import { writable } from "svelte/store";
import { client } from 'src/stores/graphql';
import { AllProjectWidgets, CurrentDashboardConfig, UpdateDashboard } from 'src/queries';
import { CurrentProject } from "src/stores/project/CurrentProject.store";

import type { Types } from "mongoose";
import type { ICurrentDashboardConfigData } from 'src/queries';
import type { EDashboardType, IDashboardWidget } from '@app/shared';
import type { IUpdateDashboardResponse } from "src/queries";
import type { ICurrentProjectStore } from "src/stores/project/CurrentProject.store";

// Store interface
export interface IProjectDashboardStore {
  // Dashboard information
  dashboardId: string,

  title: string,

  // Widgets information
  widgets: IDashboardWidget[],
};

// Function, that'll create our store
function _initialize() {
  const defaultStore: Partial<IProjectDashboardStore> = {
    widgets: [],
  };
  const { subscribe, update } = writable(defaultStore);

  // fetch function
  async function fetchDashboard() {
    // Fetching current project dashboard;
    const project: Partial<ICurrentProjectStore> = await new Promise((resolve) => {
      CurrentProject.subscribe((project) => {
        resolve(project);
      });
    });

    // +todo error handling
    if (!project?.project?._id) return;

    return new Promise((resolve, reject) => {
      const query = client.query<ICurrentDashboardConfigData>(CurrentDashboardConfig(AllProjectWidgets), { 
        variables: 
          { 
            resourceId: project.project._id,
            resourceType: 'PROJECT' as EDashboardType, 
          },
        });

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
          update((object) => {
            object.dashboardId = String(response.data.CurrentDashboard._id);
            object.widgets = response.data?.CurrentDashboard.widgets;

            object.title = response.data?.CurrentDashboard.name;

            return object;
          });
          resolve(response);
        };  
      });
    });
  };

  return {
    subscribe,

    async refetch() {
      const dashboard: Partial<IProjectDashboardStore> = await new Promise((resolve) => {
        subscribe((object) => {
          resolve(object);
        });
      });

      // Fetching
      return await fetchDashboard();
    },

    // fetchDashboardConfig
    async fetch() {
      // Fetching 

      return await fetchDashboard();
    },

    // updateLayout
    async update(widgets: IDashboardWidget[]) {
      // Fetching current dashboard
      const dashboard: Partial<IProjectDashboardStore> = await new Promise((resolve) => {
        subscribe((object) => {
          resolve(object);
        });
      });

      // +todo error handling
      if (!dashboard.dashboardId) return;

      // Updating
      const response = (await client.mutate(UpdateDashboard, { 
        variables: {
          dashboardId: dashboard.dashboardId,
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
      })) as IUpdateDashboardResponse;

      return response.data.UpdateDashboard;
    },
  }
};

// Exporting our store
export const ProjectDashboard = _initialize();