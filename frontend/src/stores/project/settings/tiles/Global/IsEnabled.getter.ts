// Importing modules
import type { IBaseDashboardWidget } from "@app/shared";
import type { EWidgetType } from "@app/shared";
import { ProjectDashboard } from "src/stores/project";

// Exporting isWidgetEnabled getter function
export function isWidgetEnabled(type: EWidgetType) {
  return function() {
    return new Promise((resolve) => {
      ProjectDashboard.subscribe((dashboard) => {
        const widgets = dashboard.widgets ?? [];

        const widget = (widgets.find((x) => x.type == type)) as IBaseDashboardWidget;
        if (widget == null) return;

        // Returning isEnabled state
        resolve(widget.enabled ?? false);
      });
    });
  };
};