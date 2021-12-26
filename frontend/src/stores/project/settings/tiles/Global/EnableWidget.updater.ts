// Importing modules
import type { TogglerUpdaterPayload } from "$config/project";
import type { EWidgetType } from "@app/shared";
import { ProjectDashboard } from "src/stores/project";
import { client } from 'src/stores/graphql';
import { ToggleWidgetQuery } from "src/queries/Dashboard/ToggleWidget.query";

// Exporting EnableWidget updater
export function EnableWidget(type: EWidgetType) {
  // Returning function
  return function(input: TogglerUpdaterPayload): Promise<boolean> {
    return new Promise(async (resolve) => {
      // Getting currentProject _id
      const dashboardId = await (new Promise((resolve) => {
        const unsubscribe = ProjectDashboard.subscribe(async ({ _id }) => {
          resolve(_id);
        });
        
        unsubscribe();
      }));

      // Updating
      await client.mutate(ToggleWidgetQuery(type[0] + type.slice(1, type.length).toLowerCase()), { 
        variables: {
          dashboardId,
          value: !input.enabled,
        },
      })
  
      // Updating state of this widget
      // in store
      // +todo
      ProjectDashboard.refetch();

      // +todo return real value
      resolve(!input.enabled);
    });
  };
};