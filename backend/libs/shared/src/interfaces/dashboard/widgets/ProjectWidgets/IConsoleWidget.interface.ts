import { IBaseDashboardWidget } from '../';
import { EWidgetType } from "../../../../enums";

export interface IConsoleWidget extends IBaseDashboardWidget {
  type: EWidgetType.CONSOLE,

  // Configuration section
};