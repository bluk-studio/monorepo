import { EWidgetType } from "@app/shared";
import { createUnionType } from "@nestjs/graphql";
import { ConsoleWidgetObject, ControlsWidgetObject, LogsWidgetObject, PlayersWidgetObject } from "src/types";

export const DashboardWidgetUnion = createUnionType({
  name: 'DashboardWidget',
  types: () => [ControlsWidgetObject, ConsoleWidgetObject, PlayersWidgetObject, LogsWidgetObject],
  
  // resolver
  resolveType: (value) => {
    // Controls Widget
    if (value.type == EWidgetType.CONTROLS) {
      return ControlsWidgetObject;
    };
    
    // Console Widget
    if (value.type == EWidgetType.CONSOLE) {
      return ConsoleWidgetObject;
    };
    
    // Players Widget
    if (value.type == EWidgetType.PLAYERS) {
      return PlayersWidgetObject;
    };

    // Logs Widget
    if (value.type == EWidgetType.LOGS) {
      return LogsWidgetObject;
    };
  },
});