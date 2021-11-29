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
      x: 0,
      y: 0,
      width: 2,
      height: 3,
    },
    {
      type: EWidgetType.CONTROLS,
      x: 0,
      y: 0,
      width: 2,
      height: 3,
    },
    {
      type: EWidgetType.CONSOLE,
      x: 0,
      y: 0,
      width: 2,
      height: 6,
    }
  ];

  // public fetchById
  public async fetchById(id: string | Types.ObjectId) {
    const _id =
      id instanceof Types.ObjectId
        ? id
        : new Types.ObjectId(id);

    // Fetching ProjectDashboardConfig
    return await this.projectDashboardModel.findOne({ _id });
  };

  // public fetchByProfile
  public async fetchByProfile(profileId: string | Types.ObjectId): Promise<Array<ProjectDashboardConfig>> {
    const _profileId =
      profileId instanceof Types.ObjectId
        ? profileId
        : new Types.ObjectId(profileId);

    // Fetching by profile id
    const configs = await this.projectDashboardModel.find({ uid: _profileId });

    return configs;
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
    const configs: Array<ProjectDashboardConfig> = await this.projectDashboardModel.find({ uid: _profileId, pid: _projectId });
    
    if (configs.length <= 0) {
      const profile = await this.profileService.fetchById(_profileId);
      if (!profile) throw new HttpException(`Profile with id ${_profileId} not found`, HttpStatus.NOT_FOUND);

      // Creating default ProjectDashboardConfig for this profile in this 
      // project
      const defaultConfig = await this.create({ name: `${profile.username ?? profile.email}'s default dashboard config` }, _profileId, _projectId);
      configs.push(defaultConfig);
    };

    return configs;
  };

  // public fetchByProject
  public async fetchByProject(projectId: string | Types.ObjectId): Promise<Array<ProjectDashboardConfig>> {
    const _projectId =
      projectId instanceof Types.ObjectId
        ? projectId
        : new Types.ObjectId(projectId);

    // Fetching by profile id
    return await this.projectDashboardModel.find({ pid: _projectId });
  };

  // public create
  public async create(
    input: CreateDashboardConfigInput, 
    profileId: string | Types.ObjectId,
    projectId: string | Types.ObjectId
  ): Promise<ProjectDashboardConfig> {
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
    if (!input.widgets || input.widgets?.length <= 0) {
      widgets.push(...this.defaultWidgets);
    } else {
      widgets.push(...input.widgets);
    };

    // Creating new dashboard configuration
    const dashboardConfiguration = new this.projectDashboardModel({
      name: input.name,
      pid: project._id,
      uid: profile._id,
      widgets
    });
    return await dashboardConfiguration.save();
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

    // - widgets
    if (input.widgets) dashboardConfig.widgets = input.widgets;

    await dashboardConfig.updateOne(dashboardConfig);
    return dashboardConfig;
  };

  // +todo
  // public delete
};