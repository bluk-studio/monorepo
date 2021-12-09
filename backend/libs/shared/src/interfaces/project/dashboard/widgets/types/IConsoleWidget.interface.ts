import { IBaseDashboardWidget } from '..';
import { EWidgetType } from "@app/shared";

export interface IConsoleWidget extends IBaseDashboardWidget {
  type: EWidgetType.CONSOLE,

  // Configuration section
};