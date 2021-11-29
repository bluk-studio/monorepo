import { EWidgetType } from "@app/shared";

// Exporting IDashboardWidget interface
export interface IDashboardWidget {
  type: EWidgetType; 
  
  // Position
  x: number;
  y: number;

  // Size
  width: number;
  height: number;
};