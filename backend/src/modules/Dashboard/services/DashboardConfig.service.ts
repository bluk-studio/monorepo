import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { EDashboardType, EWidgetType, IDashboardWidget } from '@app/shared';
import { CreateDashboardConfigInput, DashboardConfigDocument, UpdateDashboardConfigInput } from 'src/types';
import { ProfileService } from 'src/modules/Profile/services';

// Default
// +todo move this somewhere else
const DEFAULTS: Record<EDashboardType, IDashboardWidget[]> = {
  // Default widgets for Project Type
  [EDashboardType.PROJECT]: [
    {
      type: EWidgetType.PLAYERS,
      enabled: true,
      x: 0,
      y: 0,
      width: 2,
      height: 3,
    },
    {
      type: EWidgetType.CONTROLS,
      enabled: true,
      x: 0,
      y: 0,
      width: 2,
      height: 3,
    },
    {
      type: EWidgetType.CONSOLE,
      enabled: true,
      x: 0,
      y: 0,
      width: 2,
      height: 6,
    },
    {
      type: EWidgetType.LOGS,
      enabled: true,
      x: 0,
      y: 0,
      width: 4,
      height: 3,
    },
  ],

  // Default widgets for CODE_EDITOR
  [EDashboardType.CODE_EDITOR]: [
    {
      type: EWidgetType.PLAYERS,
      enabled: true,
      x: 0,
      y: 0,
      width: 2,
      height: 3,
    },
  ],

  // Default widgets for VISUAL_EDITOR
  [EDashboardType.VISUAL_EDITOR]: [],
};

// Exporting DashboardConfigService
@Injectable()
export class DashboardConfigService {
  constructor(
    @InjectModel('DashboardConfig')
    private readonly dashboardConfig: Model<DashboardConfigDocument>,

    private readonly profileService: ProfileService,
  ) {}

  // public fetchById
  public async fetchById(id: string | Types.ObjectId): Promise<DashboardConfigDocument> {
    const _id =
      id instanceof Types.ObjectId
        ? id
        : new Types.ObjectId(id);

    const config = await this.dashboardConfig.findOne({ _id });
    if (!config) throw new HttpException(`Project config not found`, HttpStatus.NOT_FOUND);

    return this._serialize(config);
  };

  // public fetchByProfile
  // +todo

  // public fetchByProfileInResource
  public async fetchByProfileInResource(
    resourceType: EDashboardType,

    // Ids
    profileId: string | Types.ObjectId,
    resourceId: string | Types.ObjectId,

    // Options
    doCreateDefault = true,
  ): Promise<DashboardConfigDocument[]> {
    // Converting string to ObjectId type
    const _profileId =
      profileId instanceof Types.ObjectId
        ? profileId
        : new Types.ObjectId(profileId);

    const _resourceId =
      resourceId instanceof Types.ObjectId
        ? resourceId
        : new Types.ObjectId(resourceId);

    // Fetching configs
    const configs: DashboardConfigDocument[] = await this.dashboardConfig.find({ type: resourceType, uid: _profileId, rid: _resourceId });

    if (configs.length <= 0) {
      // Creating default DashboardConfig if needed
      if (doCreateDefault) {
        const profile = await this.profileService.fetchById(_profileId);
        if (!profile) throw new HttpException(`Profile not found`, HttpStatus.NOT_FOUND);

        const defaultConfig = await this.create({ name: `${profile.username ?? profile.email} default dashboard config` }, resourceType, _profileId, _resourceId);
        configs.push(defaultConfig);
      } else {
        throw new HttpException('No DashboardConfigs found', HttpStatus.NOT_FOUND);
      };
    };

    return configs.map((config) => {
      return this._serialize(config);
    });
  };

  // public create
  public async create(
    input: CreateDashboardConfigInput,
    resourceType: EDashboardType,
    
    profileId: string | Types.ObjectId,
    resourceId: string | Types.ObjectId,
  ) {
    // Converting ids to ObjectId type
    const _profileId =
      profileId instanceof Types.ObjectId
        ? profileId
        : new Types.ObjectId(profileId);

    const _resourceId =
      resourceId instanceof Types.ObjectId
        ? resourceId
        : new Types.ObjectId(resourceId); 

    // Fetching profile
    const profile = await this.profileService.fetchById(_profileId);
    if (!profile) throw new HttpException('Profile not found', HttpStatus.NOT_FOUND);

    const widgets: Array<IDashboardWidget> = DEFAULTS[resourceType];

    // Creating new dashboard configuration
    const dashboardConfig = new this.dashboardConfig({
      name: input.name,
      type: resourceType,
      rid: _resourceId,
      uid: _profileId,
      widgets: widgets,
    });

    return this._serialize(await dashboardConfig.save());
  };

  // public update
  public async update(
    dashboardId: string | Types.ObjectId,
    input: UpdateDashboardConfigInput,
  ): Promise<DashboardConfigDocument> {
    // Converting dashboardId to ObjectId type
    const _dashboardId =
      dashboardId instanceof Types.ObjectId
        ? dashboardId
        : new Types.ObjectId(dashboardId);

    // Fetching this dashboard
    const dashboard = await this.fetchById(_dashboardId);
    if (!dashboard) throw new HttpException('Dashboard not found', HttpStatus.NOT_FOUND);

    // Updating
    // - name
    if (input.name) dashboard.name = input.name

    // - widgets
    if (input.widgets) {
      const widgets = [];

      // Looping through all input widgets
      input.widgets.forEach((value) => {
        let widget = DEFAULTS[dashboard.type].find((x) => x.type == value.type);
        if (!widget) return;

        widgets.push({
          ...widget,
          ...value,

          enabled: true,
        });
      });

      // Adding missing widgets
      DEFAULTS[dashboard.type].forEach((widget) => {
        if (!widgets.find((x) => x.type == widget.type)) {
          // Disabling missing widget
          widgets.push({
            ...widget,

            enabled: false,
          });
        };
      });

      // Updating widgets array
      dashboard.widgets = widgets;
    } else {
      // Default widgets
      dashboard.widgets = DEFAULTS[dashboard.type];
    };

    // Updating document in database
    await dashboard.updateOne(dashboard);
    return this._serialize(dashboard);
  };

  // private _serialize
  private _serialize(config: DashboardConfigDocument): DashboardConfigDocument {
    // Adding all default widgets to 
    // widgets array. If default widget
    const defaults = DEFAULTS[config.type];

    defaults.forEach((widget) => {
      if (!config.widgets.find((x) => x.type == widget.type)) {
        widget.enabled = false;
        config.widgets.push(widget);
      };
    });

    return config;
  };
};