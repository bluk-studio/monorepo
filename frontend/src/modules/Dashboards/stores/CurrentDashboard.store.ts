// Importing modules
import type { EDashboardType, IDashboardWidget, IExecutionResult } from '@app/shared';
import { writable } from 'svelte/store';
import { client } from 'src/stores/graphql';

// Queries
import { CurrentDashboard, ICurrentDashboardData, ISetCurrentDashboardData, SetCurrentDashboard, UpdateDashboard } from '../queries';
import type { IUpdateDashboardData } from '../queries';

// ICurrentDashboardStore interface
export interface ICurrentDashboardStore {
  type: EDashboardType,

  id: string,
  resourceId: string,

  name: string,
  widgets: IDashboardWidget[],

  updating: boolean,
};

// Function, that'll initialize our store
function _initilize() {
  // Default store object
  const defaultStore: Partial<ICurrentDashboardStore> = {
    updating: true,
  };
  const { subscribe, update } = writable(defaultStore);

  // Returning subscribe and other methods
  return {
    subscribe,

    // public fetch
    async fetch(type: EDashboardType, resourceId: string) {
      // Generating query
      const query = client.query<ICurrentDashboardData>(CurrentDashboard(type), {
        variables: {
          resourceId
        },
      });

      // Refetching
      query.refetch();

      // Subscribing
      query.subscribe((response) => {
        // Waiting for query to fully load
        if (response.loading) return;

        // Checking response
        if (response.error) {
          // +todo error handling
          console.error('error while fetching CurrentDsahboard');
        } else {
          // Updating our store
          update((object) => {
            object.id = String(response.data?.CurrentDashboard._id);
            object.resourceId = resourceId;

            object.name = response.data?.CurrentDashboard.name;
            object.type = type;
            object.widgets = response.data?.CurrentDashboard.widgets;

            object.updating = false;

            return object;
          });
        };
      });
    },

    // public refetch

    // public setUpdatingState
    setUpdatingState(state: boolean) {
      update((object) => {
        object.updating = state;

        return object;
      });
    },

    // public setCurrentDashboard
    async setCurrentDashboard(dashboardId: string, resourceId?: string) {
      // Fetching resourceId if needed
      let _resourceId;
      if (resourceId == null) {
        const dashboard: Partial<ICurrentDashboardStore> = await new Promise((resolve) => {
          subscribe((object) => {
            resolve(object);
          });
        });
     
        _resourceId = dashboard.resourceId;
      } else {
        _resourceId = resourceId;
      };

      // +todo error handling
      if (_resourceId == null) return;
    
      // Updating
      const response = (await client.mutate(SetCurrentDashboard(), {
        variables: {
          resourceId: _resourceId,
          dashboardId: dashboardId,
        },
      })) as IExecutionResult<ISetCurrentDashboardData>;

      return response.data?.SetCurrentDashboard;
    },

    // public update
    async update(
      widgets: IDashboardWidget[],
    ) {
      // Getting current dashboard information
      const dashboard: Partial<ICurrentDashboardStore> = await new Promise((resolve) => {
        subscribe((object) => {
          resolve(object);
        });
      });

      // +todo error handling
      if (!dashboard.id) return;

      // Updating
      const response = (await client.mutate(UpdateDashboard(), {
        variables: {
          dashboardId: dashboard.id,
          input: {
            widgets: widgets.map((widget) => {
              return {
                type: widget.type,
                x: widget.x,
                y: widget.y,
                width: widget.width,
                height: widget.height,
              }
            }),
          },
        }
      })) as IExecutionResult<IUpdateDashboardData>;

      return response.data?.UpdateDashboard;
    },
  };
};

// Exporting our store
export const CurrentDashboardStore = _initilize();