import { Args, Context, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { CreateDashboardConfigInput, Profile, ProfileObject, Project, ProjectDashboardConfig, ProjectDashboardConfigObject, ProjectObject, UpdateDashboardConfigInput, ControlsWidgetObject, UpdateControlsWidgetInput, UpdateConsoleWidgetInput, UpdatePlayersWidgetInput, UpdateLogsWidgetInput } from 'src/types';
import { ProjectDashboardService, ProjectService } from 'src/modules/Project/services';
import { HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { UserAuthGuard } from 'src/guards';
import { ProfileService } from 'src/modules/Profile/services';
import { EWidgetType, IRequest, ISessionProject } from '@app/shared';
import { Types } from 'mongoose';

@Resolver(of => ProjectDashboardConfigObject)
export class ProjectDashboardConfigResolver {
  constructor(
    private readonly service: ProjectDashboardService,

    private readonly projectService: ProjectService,
    private readonly profileService: ProfileService,
  ) {}

  // resolve project field
  @ResolveField('project', returns => ProjectObject)
  public async resolveProjectField(@Parent() parent: ProjectDashboardConfig) {
    return await this.projectService.fetchById(parent.pid);
  };

  // resolve profile field
  @ResolveField('profile', returns => ProfileObject)
  public async resolveProfileField(@Parent() parent: ProjectDashboardConfig) {
    return await this.profileService.fetchById(parent.uid);
  };

  // query ProjectDashboardById
  @Query(returns => ProjectDashboardConfigObject, { name: 'ProjectDashboard' })
  public async queryProjectDashboardById(
    @Args('dashboardId') dashboardId: string,
  ) {
    return await this.service.fetchById(dashboardId);
  };

  // query ProjectDashboardByProfile
  @UseGuards(UserAuthGuard)
  @Query(returns => [ProjectDashboardConfigObject], { name: 'ProjectDashboardByProfile' })
  public async queryProjectDashboardByProfile(
    @Context('user') profile: Profile,
    @Args('projectId', { nullable: true }) projectId?: string,
  ) {
    if (projectId) {
      return await this.service.fetchByProfileInProject(profile._id, projectId);
    } else {
      return await this.service.fetchByProfile(profile._id);
    };
  };

  // query CurrentProjectDashboard
  @UseGuards(UserAuthGuard)
  @Query(returns => ProjectDashboardConfigObject, { name: 'CurrentProjectDashboard' })
  public async queryCurrentProjectDashboard(
    @Args('projectId') projectId: string,
    @Context('user') profile: Profile,
    @Context('req') req: IRequest,
  ) {
    const _projectId = new Types.ObjectId(projectId);

    // Getting information from session object.
    const projects = req.session.projects ?? [];
    const project = projects.find((x) => x._id == projectId);
    
    if (project && project.activeDashboardId) {
      // Getting this dashboard id
      const dashboard = await this.service.fetchById(project.activeDashboardId);

      if (!dashboard) {
        // Updating session
        const newProjectConfig: ISessionProject = {
          _id: projectId,
        };

        if (projects.find((x) => x._id == projectId)) {
          const index = projects.findIndex((x) => x._id == projectId);
          projects[index] = newProjectConfig;       
        };

        req.session.projects = projects;

        // Throwing error
        throw new HttpException(`ProjectDashboard with id ${project.activeDashboardId} does not exists!`, HttpStatus.NOT_FOUND);
      } else {
        return dashboard;
      };
    } else {
      // Getting all dashboards
      const dashboards = await this.service.fetchByProfileInProject(profile._id, _projectId);
      const currentDashboard = dashboards[0];
      
      // Updating session
      const newProjectConfig: ISessionProject = {
        _id: projectId,
        activeDashboardId: String(currentDashboard._id),
      };

      if (projects.find((x) => x._id == projectId)) {
        const index = projects.findIndex((x) => x._id == projectId);
        projects[index] = newProjectConfig;       
      } else {
        projects.push(newProjectConfig);
      };

      req.session.projects = projects;

      return currentDashboard;
    };
  };

  // mutation SetCurrentProjectDashboard
  @UseGuards(UserAuthGuard)
  @Mutation(returns => ProjectDashboardConfigObject, { name: 'SetCurrentProjectDashboard' })
  public async setCurrentProjectDashboard(
    @Args('projectId') projectId: string,
    @Args('dashboardId') dashboardId: string,
    @Context('user') profile: Profile,
    @Context('req') req: IRequest,
  ) {
    const projects = req.session.projects ?? [];
    const dashboard = await this.service.fetchById(dashboardId);

    if (!dashboard) throw new HttpException(`ProjectDashboard with id ${dashboardId} does not exists`, HttpStatus.NOT_FOUND);

    // Updating session
    const newProjectConfig: ISessionProject = {
      _id: projectId,
      activeDashboardId: String(dashboardId),
    };

    if (projects.find((x) => x._id == projectId)) {
      const index = projects.findIndex((x) => x._id == projectId);
      projects[index] = newProjectConfig;       
    } else {
      projects.push(newProjectConfig);
    };

    req.session.projects = projects;
    return dashboard;
  };
  
  // mutation CreateProjectDashboard
  @UseGuards(UserAuthGuard)
  @Mutation(returns => ProjectDashboardConfigObject, { name: 'CreateProjectDashboard' })
  public async createProjectDashboard(
    @Args('input') input: CreateDashboardConfigInput,
    @Args('projectId') projectId: string,
    @Context('user') profile: Profile,
  ) {
    return await this.service.create(input, profile._id, projectId);
  };

  // mutation UpdateProjectDashboard
  @UseGuards(UserAuthGuard)
  @Mutation(returns => ProjectDashboardConfigObject, { name: 'UpdateProjectDashboard' })
  public async updateProjectDashboard(
    @Args('dashboardId') dashboardId: string,
    @Args('input') input: UpdateDashboardConfigInput,
    @Context('user') profile: Profile,
  ) {
    // Fetching ProjectDashboard's for this profile
    const instances = await this.service.fetchByProfile(profile._id);

    if (instances.filter((x) => x).length > 0) {
      // Updating
      return await this.service.update(dashboardId, input);
    } else {
      throw new HttpException(`ProjectDashboardConfig with id ${dashboardId} isn't Profile's (${profile._id})`, HttpStatus.BAD_REQUEST);
    };
  };

  // mutation UpdateControlsWidget
  @UseGuards(UserAuthGuard)
  @Mutation(returns => ProjectDashboardConfigObject, {
    name: 'UpdateControlsWidget'
  })
  public async updateControlsWidget(
    @Args('dashboardId') dashboardId: string,
    @Args('input') input: UpdateControlsWidgetInput,
    @Context('user') profile: Profile,
  ) {
    // Updating this widget
    return await this.service.updateWidget(
      dashboardId,
      EWidgetType.CONTROLS,
      input,
      profile,
    );
  };

  // mutation UpdateConsoleWidget
  @UseGuards(UserAuthGuard)
  @Mutation(returns => ProjectDashboardConfigObject, {
    name: 'UpdateConsoleWidget'
  })
  public async updateConsoleWidget(
    @Args('dashboardId') dashboardId: string,
    @Args('input') input: UpdateConsoleWidgetInput,
    @Context('user') profile: Profile,
  ) {
    // Updating this widget
    return await this.service.updateWidget(
      dashboardId,
      EWidgetType.CONSOLE,
      input,
      profile,
    );
  };

  // mutation UpdatePlayersWidget
  @UseGuards(UserAuthGuard)
  @Mutation(returns => ProjectDashboardConfigObject, {
    name: 'UpdatePlayersWidget'
  })
  public async updatePlayersWidget(
    @Args('dashboardId') dashboardId: string,
    @Args('input') input: UpdatePlayersWidgetInput,
    @Context('user') profile: Profile,
  ) {
    // Updating this widget
    return await this.service.updateWidget(
      dashboardId,
      EWidgetType.PLAYERS,
      input,
      profile,
    );
  };

  // mutation UpdateLogsWidget
  @UseGuards(UserAuthGuard)
  @Mutation(returns => ProjectDashboardConfigObject, {
    name: 'UpdateLogsWidget'
  })
  public async updateLogsWidget(
    @Args('dashboardId') dashboardId: string,
    @Args('input') input: UpdateLogsWidgetInput,
    @Context('user') profile: Profile,
  ) {
    // Updating this widget
    return await this.service.updateWidget(
      dashboardId,
      EWidgetType.LOGS,
      input,
      profile,
    );
  };
};