import type { EWidgetType } from "@app/shared";
import { EnableWidget, isWidgetEnabled } from "../Global";

// Exporting PlayersWidget getters object
export const PlayersWidgetGetters = {
  isEnabled: isWidgetEnabled('PLAYERS' as EWidgetType),
};

// Exporting PlayersWidget updaters object
export const PlayersWidgetUpdaters = {
  enable: EnableWidget('PLAYERS' as EWidgetType),
};