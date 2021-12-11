import type { EWidgetType } from "@app/shared";
import { EnableWidget, isWidgetEnabled } from "../Global";

// Exporting ControlsWidget getters object
export const ControlsWidgetGetters = {
  isEnabled: isWidgetEnabled('CONTROLS' as EWidgetType),
};

// Exporting ControlsWidget updaters object
export const ControlsWidgetUpdaters = {
  enable: EnableWidget('CONTROLS' as EWidgetType),
};