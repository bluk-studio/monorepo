// Importing modules
import type { EDashboardType, IDashboardConfig } from '@app/shared';
import { writable } from 'svelte/store';
import { client } from 'src/stores/graphql';

// Queries
import { DashboardsByType } from '../queries';
import type { IDashboardsByTypeData } from '../queries';

// ITypedDashboardsStore interface
export interface ITypedDashboardsStore {
  type: EDashboardType,
  list: Partial<IDashboardConfig>[],
};

// Function, that'll create our store
function _initialize() {
  // Default store object
  const defaultStore: Partial<ITypedDashboardsStore> = {};
  const { subscribe, update } = writable(defaultStore);

  // Returning subscribe and other methods
  return {
    subscribe,

    // public fetch
    fetch(type: EDashboardType) {
      // Generating query
      const query = client.query<IDashboardsByTypeData>(DashboardsByType(), {
        variables: {
          dashboardType: type,
        },
      });

      // Refetching
      query.refetch();

      // Subscribing
      query.subscribe((response) => {
        // Waiting for response to load
        if (response.loading) return;

        // Processing response
        if (response.error) {
          // +todo error handling
          console.error('error while fetching TypedDashboards');
        } else {
          // Updating store
          update((object) => {
            object.type = type;
            object.list = response.data?.DashboardsByType ?? [];

            return object;
          });
        };
      });
    },
  };
};

// Exporting our store
export const TypedDashboardsStore = _initialize();