import { EWidgetType } from '@app/shared';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { UpdateConsoleWidgetInput, UpdateControlsWidgetInput, UpdateLogsWidgetInput, UpdatePlayersWidgetInput } from 'src/types';
import { DashboardConfigService } from '.';

// UpdateInput union
// +todo move
export type UpdateInputUnion = 
  // ProjectWidgets
  UpdateControlsWidgetInput |
  UpdateConsoleWidgetInput |
  UpdatePlayersWidgetInput |
  UpdateLogsWidgetInput

  // CodeEditorWidgets

  // VisualEditorWidgets

// Exporting DashboardWidgets service
@Injectable()
export class DashboardWidgetsService {
  constructor(
    private readonly dashboardService: DashboardConfigService,
  ) {}

  // public updateWidget
  public async updateWidget(
    dashboardId: string | Types.ObjectId,

    widget: {
      type: EWidgetType,
      input: UpdateInputUnion
    },
  ) {
    // Converting dashboardId to ObjectId type
    const _dashboardId = 
      dashboardId instanceof Types.ObjectId
        ? dashboardId
        : new Types.ObjectId(dashboardId);

    // Fetching this dashboard
    const dashboard = await this.dashboardService.fetchById(dashboardId);
    if (!dashboard) throw new HttpException('Dashboard not found', HttpStatus.NOT_FOUND);

    // Updating this dashboard's widget of type widget.type
    dashboard.widgets = dashboard.widgets.map((x) => {
      // Updating widget
      if (x.type == widget.type) {
        return {
          ...x,
          ...widget.input,
        };
      };

      // Returning original widget
      return x;
    });

    // Updating document
    await dashboard.updateOne(dashboard);
    return dashboard;
  };
};