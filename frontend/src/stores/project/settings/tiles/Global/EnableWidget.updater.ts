// Importing modules
import type { TogglerUpdaterPayload } from "$config/project";
import type { EWidgetType } from "@app/shared";
import { ProjectDashboard } from "src/stores/project";
import { client } from 'src/stores/graphql';

// Importing queries
import { ToggleConsoleWidget, ToggleControlsWidget, TogglePlayersWidget, ToggleLogsWidget } from "src/queries";

// Exporting EnableWidget updater
export function EnableWidget(type: EWidgetType) {
  // Determining which query we need to use
  let query;
  switch (type) {
    case 'PLAYERS':
      query = TogglePlayersWidget;
      break;
    case 'CONSOLE':
      query = ToggleConsoleWidget;
      break;
    case 'CONTROLS':
      query = ToggleControlsWidget;
      break;
    case 'LOGS':
      query = ToggleLogsWidget;
      break;
    default:
      break;
  };
  // +todo erro handling
  if (query == null) return;

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
      const response = (await client.mutate(query, { 
        variables: {
          dashboardId,
          value: !input.enabled,
        },
      }));
  
      // Updating state of this widget
      // in store
      // +todo
      ProjectDashboard.refetch();

      // +todo return real value
      resolve(!input.enabled);
    });
  };
};