import { IBaseDashboardWidget } from '..';
import { EWidgetType } from "@app/shared";

export interface ILogsWidget extends IBaseDashboardWidget {
  type: EWidgetType.LOGS,

  // Configuration section
};