import type { IDashboardWidget } from '@app/shared';
import { CurrentDashboardConfig, ICurrentDashboardConfigData, ICurrentDashboardConfigResponse, IUpdateDashboardResponse, UpdateDashboard } from 'src/queries';
import { writable } from 'svelte/store';
import { EditorStore, IEditorStore } from '.';
import { client } from 'src/stores/graphql';

// IEditorDashboardStore interface
export interface IEditorDashboardStore {
  // Dashboard information
  dashboardId: string,

  title: string,

  // Widgets information
  widgets: IDashboardWidget[];
};

// Function, that'll initialize our store
function _initialize() {
  // Default store object
  const defaultStore: Partial<IEditorDashboardStore> = {};

  const { subscribe, update } = writable(defaultStore);

  // FetchDashboard function (reusable for some reason)
  async function fetchDashboard() {
    console.log('fetch dashboard');
    // Fetching Editor's resource type
    const editor: Partial<IEditorStore> = await new Promise((resolve) => {
      EditorStore.subscribe((editor) => {
        resolve(editor);
      });
    });

    // +todo error handling
    if (!editor.resourceType || !editor.resourceId) return;
    
    // Fetching dashboard
    return new Promise((resolve, reject) => {
      const query = client.query<ICurrentDashboardConfigData>(CurrentDashboardConfig(), {
        variables: {
          resourceId: editor.resourceId,
          resourceType: editor.resourceType,
        },
      });

      // Refetching
      query.refetch();

      // Subscribing to response
      query.subscribe((response) => {
        // Waiting for response to load
        if (response.loading) return;

        // Checking response
        if (response.error) {
          // +todo error handling
          reject({ error: true });
        } else {
          // Updating store
          update((object) => {
            object.dashboardId = String(response.data?.CurrentDashboard._id);
            object.widgets = response.data?.CurrentDashboard.widgets;

            object.title = response.data?.CurrentDashboard.name;

            return object;
          });
          resolve(response.data?.CurrentDashboard);
        };
      });
    });
  };

  // Returning subscribe and other methods
  return {
    subscribe,

    // async fetch
    async fetch() {
      return await fetchDashboard();
    },

    // async refetch
    async refetch() {
      return await fetchDashboard();
    },

    // async update
    async update(
      widgets: IDashboardWidget[],
    ) {
      // Fetching current dashboard
      const dashboard: Partial<IEditorDashboardStore> = await new Promise((resolve) => {
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
        }
      })) as IUpdateDashboardResponse;

      return response.data?.UpdateDashboard;
    },
  };
};

export const EditorDashboardStore = _initialize();