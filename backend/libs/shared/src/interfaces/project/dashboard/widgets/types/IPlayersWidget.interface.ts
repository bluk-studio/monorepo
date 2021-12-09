import { IBaseDashboardWidget } from '..';
import { EWidgetType } from "@app/shared";

export interface IPlayersWidget extends IBaseDashboardWidget {
  type: EWidgetType.PLAYERS,

  // Configuration section
};