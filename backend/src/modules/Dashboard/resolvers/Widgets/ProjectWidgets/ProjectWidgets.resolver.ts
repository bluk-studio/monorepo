import { EWidgetType, IConsoleWidget, IControlsWidget, ILogsWidget, IPlayersWidget } from '@app/shared';
import { HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { UserAuthGuard } from 'src/guards';
import { DashboardConfigService, DashboardWidgetsService, UpdateInputUnion } from 'src/modules/Dashboard/services';
import { Profile, UpdateConsoleWidgetInput, UpdateControlsWidgetInput, UpdateLogsWidgetInput, UpdatePlayersWidgetInput } from 'src/types';

// Importing ProjectWidgets
import { 
  LogsWidgetObject,
  ConsoleWidgetObject,
  ControlsWidgetObject,
  PlayersWidgetObject 
} from 'src/types/objects/dashboard/widgets';

// +todo refactor this somehow
async function checkAndUpdate(
  // Variables
  data: {
    type: EWidgetType,
    dashboardId: string,
    input: UpdateInputUnion,

    profile: Profile,
  },

  // Needed Services
  dashboardService: DashboardConfigService,
  widgetsService: DashboardWidgetsService,
) {
  // Fetching dashboard
  let dashboard = await dashboardService.fetchById(data.dashboardId);
  
  // +todo proper permissions (? maybe)
  if (!dashboard) throw new HttpException('Dashboard not found', HttpStatus.NOT_FOUND);
  if (String(dashboard.uid) != String(data.profile._id)) throw new HttpException('This Dashboard do not belong to this profile', HttpStatus.UNAUTHORIZED);

  // Updating widget
  dashboard = await widgetsService.updateWidget(
    data.dashboardId,
    {
      type: data.type,
      input: data.input,
    },
  );

  // Returning updated widget
  return dashboard.widgets.find((x) => x.type == data.type);
};

// Controls Widget
@Resolver(of => ControlsWidgetObject)
export class ControlsWidgetResolver {
  constructor(
    private readonly dashboardService: DashboardConfigService,
    private readonly widgetsService: DashboardWidgetsService,
  ) {}

  // mutation UpdateControlsWidget
  @UseGuards(UserAuthGuard)
  @Mutation(returns => ControlsWidgetObject, {
    name: 'UpdateControlsWidget'
  })
  public async updateControlsWidget(
    @Args('dashboardId') dashboardId: string,
    @Args('input') input: UpdateControlsWidgetInput,

    @Context('user') profile: Profile,
  ): Promise<ControlsWidgetObject> {
    return (await checkAndUpdate({
      type: EWidgetType.CONTROLS,
      
      dashboardId,
      input,
      profile
    }, this.dashboardService, this.widgetsService)) as IControlsWidget;
  };
};

// Console Widget
@Resolver(of => ConsoleWidgetObject)
export class ConsoleWidgetResolver {
  constructor(
    private readonly dashboardService: DashboardConfigService,
    private readonly widgetsService: DashboardWidgetsService,
  ) {}

  // mutation UpdateConsoleWidget
  @UseGuards(UserAuthGuard)
  @Mutation(returns => ConsoleWidgetObject, {
    name: 'UpdateConsoleWidget'
  })
  public async updateConsoleWidget(
    @Args('dashboardId') dashboardId: string,
    @Args('input') input: UpdateConsoleWidgetInput,

    @Context('user') profile: Profile,
  ): Promise<ConsoleWidgetObject> {
    return (await checkAndUpdate({
      type: EWidgetType.CONSOLE,
      
      dashboardId,
      input,
      profile
    }, this.dashboardService, this.widgetsService)) as IConsoleWidget;
  };
};

// Players Widget
@Resolver(of => PlayersWidgetObject)
export class PlayersWidgetResolver {
  constructor(
    private readonly dashboardService: DashboardConfigService,
    private readonly widgetsService: DashboardWidgetsService,
  ) {}

  // mutation UpdatePlayersWidget
  @UseGuards(UserAuthGuard)
  @Mutation(returns => PlayersWidgetObject, {
    name: 'UpdatePlayersWidget'
  })
  public async updatePlayersWidget(
    @Args('dashboardId') dashboardId: string,
    @Args('input') input: UpdatePlayersWidgetInput,

    @Context('user') profile: Profile,
  ): Promise<PlayersWidgetObject> {
    return (await checkAndUpdate({
      type: EWidgetType.PLAYERS,
      
      dashboardId,
      input,
      profile
    }, this.dashboardService, this.widgetsService)) as IPlayersWidget;
  };
};

// Logs Widget
@Resolver(of => LogsWidgetObject)
export class LogsWidgetResolver {
  constructor(
    private readonly dashboardService: DashboardConfigService,
    private readonly widgetsService: DashboardWidgetsService,
  ) {}

  // mutation UpdateLogsWidget
  @UseGuards(UserAuthGuard)
  @Mutation(returns => LogsWidgetObject, {
    name: 'UpdateLogsWidget'
  })
  public async updateLogsWidget(
    @Args('dashboardId') dashboardId: string,
    @Args('input') input: UpdateLogsWidgetInput,

    @Context('user') profile: Profile,
  ): Promise<LogsWidgetObject> {
    return (await checkAndUpdate({
      type: EWidgetType.LOGS,
      
      dashboardId,
      input,
      profile
    }, this.dashboardService, this.widgetsService)) as ILogsWidget;
  };
};