import type { EWidgetType } from "@app/shared";
import { EnableWidget, isWidgetEnabled } from "../Global";

// Exporting LogsWidget getters object
export const LogsWidgetGetters = {
  isEnabled: isWidgetEnabled('LOGS' as EWidgetType),
};

// Exporting LogsWidget updaters object
export const LogsWidgetUpdaters = {
  enable: EnableWidget('LOGS' as EWidgetType),
};