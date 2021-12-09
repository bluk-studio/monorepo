import { EWidgetType } from "@app/shared";

// Exporting IBaseDashboardWidget interface
export interface IBaseDashboardWidget {
  type: EWidgetType;
  enabled: boolean;

  // Position
  x: number;
  y: number;

  // Size
  width: number;
  height: number;
};