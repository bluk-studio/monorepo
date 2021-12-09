import { EWidgetType, IDashboardWidget } from '@app/shared';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ProfileService } from 'src/modules/Profile/services';
import { CreateDashboardConfigInput, Profile, Project, ProjectDashboardConfig, ProjectDashboardConfigDocument, UpdateDashboardConfigInput } from 'src/types';
import { ProjectService } from '..';

@Injectable()
export class ProjectDashboardService {
  constructor(
    @InjectModel('ProjectDashboardConfig')
    private readonly projectDashboardModel: Model<ProjectDashboardConfigDocument>,

    private readonly profileService: ProfileService,
    private readonly projectService: ProjectService,
  ) {}

  // Properties
  // - default widgets array
  public defaultWidgets: Array<IDashboardWidget> = [
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
  ];

  // public fetchById
  public async fetchById(id: string | Types.ObjectId) {
    const _id =
      id instanceof Types.ObjectId
        ? id
        : new Types.ObjectId(id);

    // Fetching ProjectDashboardConfig
    return this._serialize(await this.projectDashboardModel.findOne({ _id }));
  };

  // public fetchByProfile
  public async fetchByProfile(profileId: string | Types.ObjectId): Promise<Array<ProjectDashboardConfig>> {
    const _profileId =
      profileId instanceof Types.ObjectId
        ? profileId
        : new Types.ObjectId(profileId);

    // Fetching by profile id
    const configs = await this.projectDashboardModel.find({ uid: _profileId });

    return configs.map((config) => {
      return this._serialize(config);
    });
  };

  // public fetchByProfileInProject
  public async fetchByProfileInProject(
    profileId: string | Types.ObjectId,
    projectId: string | Types.ObjectId
  ): Promise<Array<ProjectDashboardConfig>> {
    const _profileId =
      profileId instanceof Types.ObjectId
        ? profileId
        : new Types.ObjectId(profileId);

    const _projectId =
      projectId instanceof Types.ObjectId
        ? projectId
        : new Types.ObjectId(projectId);  

    // Fetching by profile id
    const configs: Array<ProjectDashboardConfigDocument> = await this.projectDashboardModel.find({ uid: _profileId, pid: _projectId });
    
    if (configs.length <= 0) {
      const profile = await this.profileService.fetchById(_profileId);
      if (!profile) throw new HttpException(`Profile with id ${_profileId} not found`, HttpStatus.NOT_FOUND);

      // Creating default ProjectDashboardConfig for this profile in this 
      // project
      const defaultConfig = await this.create({ name: `${profile.username ?? profile.email}'s default dashboard config` }, _profileId, _projectId);
      configs.push(defaultConfig);
    };

    return configs.map((config) => {
      return this._serialize(config);
    });
  };

  // public fetchByProject
  public async fetchByProject(projectId: string | Types.ObjectId): Promise<Array<ProjectDashboardConfig>> {
    const _projectId =
      projectId instanceof Types.ObjectId
        ? projectId
        : new Types.ObjectId(projectId);

    // Fetching by profile id
    return (await this.projectDashboardModel.find({ pid: _projectId })).map((config) => {
      return this._serialize(config);
    });
  };

  // public create
  public async create(
    input: CreateDashboardConfigInput, 
    profileId: string | Types.ObjectId,
    projectId: string | Types.ObjectId
  ): Promise<ProjectDashboardConfigDocument> {
    const _profileId =
      profileId instanceof Types.ObjectId
        ? profileId
        : new Types.ObjectId(profileId);

    const _projectId =
      projectId instanceof Types.ObjectId
        ? projectId
        : new Types.ObjectId(projectId); 

    // Fetching project and profile
    const profile = await this.profileService.fetchById(_profileId);
    const project = await this.projectService.fetchById(_projectId);

    // Default widgets
    const widgets: Array<IDashboardWidget> = [];
    widgets.push(...this.defaultWidgets);

    // Creating new dashboard configuration
    const dashboardConfiguration = new this.projectDashboardModel({
      name: input.name,
      pid: project._id,
      uid: profile._id,
      widgets
    });
    return this._serialize(await dashboardConfiguration.save());
  };

  // public update
  public async update(
    dashboardId: string | Types.ObjectId,
    input: UpdateDashboardConfigInput,
  ) {
    // Fetching this dashboardInput
    const _dashboardId =
      dashboardId instanceof Types.ObjectId
        ? dashboardId
        : new Types.ObjectId(dashboardId);

    const dashboardConfig = await this.fetchById(_dashboardId);
    if (!dashboardConfig) throw new HttpException(`ProjectDashboardConfig with id ${_dashboardId} not found`, HttpStatus.NOT_FOUND);

    // Updating
    // - name
    if (input.name) dashboardConfig.name = input.name;

    // - widgets positions
    if (input.widgets) {
      const widgets = [];
      
      // Adding widgets
      input.widgets.forEach((value) => {
        const widget = this.defaultWidgets.find((x) => x.type == value.type);
        if (!widget) return;

        widget.x = value.x;
        widget.y = value.y;
        widget.height = value.height;
        widget.width = value.width;

        widgets.push(widget);
      });

      // Adding missing widgets
      this.defaultWidgets.forEach((widget) => {
        if (!widgets.find((x) => x.type == widget.type)) {
          widgets.push(widget);
        };
      });

      // Updating DashboardConfig widgets property
      dashboardConfig.widgets = widgets;
    } else {
      dashboardConfig.widgets = this.defaultWidgets;
    };

    await dashboardConfig.updateOne(dashboardConfig);
    return this._serialize(dashboardConfig);
  };

  // public _serialize
  public _serialize(config: ProjectDashboardConfigDocument): ProjectDashboardConfigDocument {
    // Checking if we have all widgets in widgets
    // property (and adding them (disabled))
    this.defaultWidgets.forEach((widget) => {
      if (!config?.widgets.find((x) => x.type == widget.type)) {
        widget.enabled = false;
        config?.widgets.push(widget);
      };
    });

    return config;
  };

  // +todo
  // public delete

  // public updateWidget
  public async updateWidget(
    dashboardId: string | Types.ObjectId,
    widgetType: EWidgetType,
    // input:
  ) {

  };
};