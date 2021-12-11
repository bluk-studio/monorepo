import type { EWidgetType } from "@app/shared";
import { EnableWidget, isWidgetEnabled } from "../Global";

// Exporting ConsoleWidget getters object
export const ConsoleWidgetGetters = {
  isEnabled: isWidgetEnabled('CONSOLE' as EWidgetType),
};

// Exporting ConsoleWidget updaters object
export const ConsoleWidgetUpdaters = {
  enable: EnableWidget('CONSOLE' as EWidgetType),
};