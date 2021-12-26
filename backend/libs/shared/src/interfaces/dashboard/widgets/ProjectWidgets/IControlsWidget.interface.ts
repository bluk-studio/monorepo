import { IBaseDashboardWidget } from '../';
import { EWidgetType } from "@app/shared";

export interface IControlsWidget extends IBaseDashboardWidget {
  type: EWidgetType.CONTROLS,

  // Configuration section
};