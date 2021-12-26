import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { DashboardConfigObject } from 'src/types/objects/dashboard';
import { DashboardConfigService } from 'src/modules/Dashboard/services';
import { CreateProjectInput, DashboardConfig, Profile, UpdateDashboardConfigInput } from 'src/types';
import { HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { UserAuthGuard } from 'src/guards';
import { EDashboardType, IRequest, ISessionResource } from '@app/shared';

@Resolver(of => DashboardConfigObject)
export class DashboardResolver {
  constructor(
    private readonly service: DashboardConfigService,
  ) {}

  // +todo
  // resolve profile field

  // +todo
  // resolve plugin field

  // +todo
  // resolve project field

  // query DashboardById
  @Query(returns => DashboardConfigObject, {
    name: 'DashboardById'
  })
  public async queryDashboardById(
    @Args('id') dashboardId: string,
  ): Promise<DashboardConfig> {
    return await this.service.fetchById(dashboardId);
  };

  // query DashboardByProfileInResource
  @UseGuards(UserAuthGuard)
  @Query(returns => [DashboardConfigObject], {
    name: 'DashboardByProfileInResource',
  })
  public async queryDashboardByProfileInResource(
    @Context('user') profile: Profile,

    @Args({ name: 'type', type: () => EDashboardType }) resourceType: EDashboardType,
    @Args('id') resourceId: string,
  ): Promise<DashboardConfig[]> {
    return await this.service.fetchByProfileInResource(resourceType, profile._id, resourceId);
  };

  // mutation CreateDashboard
  @UseGuards(UserAuthGuard)
  @Mutation(returns => DashboardConfigObject, {
    name: 'CreateDashboard'
  })
  public async createDashboard(
    @Args('input') input: CreateProjectInput,

    @Args({ name: 'resourceType', type: () => EDashboardType }) resourceType: EDashboardType,
    @Args('resourceId') resourceId: string,

    @Context('user') profile: Profile,  
  ): Promise<DashboardConfig> {
    return await this.service.create(input, resourceType, profile._id, resourceId);
  };

  // mutation UpdateDashboard
  @UseGuards(UserAuthGuard)
  @Mutation(returns => DashboardConfigObject, {
    name: 'UpdateDashboard',
  })
  public async updateDashboard(
    @Args('dashboardId') dashboardId: string,
    @Args('input') input: UpdateDashboardConfigInput,

    @Context('user') profile: Profile,
  ): Promise<DashboardConfig> {
    // Fetching this dashboard
    const dashboard = await this.service.fetchById(dashboardId);

    // +todo proper permissions
    if (!dashboard) throw new HttpException('Dashboard not found', HttpStatus.NOT_FOUND);
    if (String(dashboard.uid) != String(profile._id)) throw new HttpException('This Dashboard do not belong to this profile', HttpStatus.UNAUTHORIZED);

    // Updating dashboard
    const updated = await this.service.update(dashboardId, input);
    return updated;
  };

  // query CurrentDashboard
  @UseGuards(UserAuthGuard)
  @Query(returns => DashboardConfigObject, {
    name: 'CurrentDashboard',
    nullable: true,
  })
  public async queryCurrentDashboard(
    @Context('user') profile: Profile,
    @Context('req') req: IRequest,

    @Args({ name: 'resourceType', type: () => EDashboardType }) resourceType: EDashboardType,
    @Args('resourceId') resourceId: string,
  ): Promise<DashboardConfig> {
    // Getting information from session object
    const resources = req.session.resources ?? [];
    const resource = resources.find((resource) => resource._id == resourceId && resource.dashboard?.type == resourceType);
  
    if (resource && resource.dashboard?.activeId) {
      const dashboard = await this.service.fetchById(resource.dashboard.activeId);

      // Returning dashboard if set - throwing error if not set
      if (!dashboard) {
        throw new HttpException(`Dashboard not found`, HttpStatus.NOT_FOUND);
      } else {
        // +todo permissions
        if (String(dashboard.uid) != String(profile._id)) throw new HttpException('This Dashboard do not belong to this profile', HttpStatus.UNAUTHORIZED);

        return dashboard;
      };
    } else {
      // Getting all dashboards
      const dashboards = await this.service.fetchByProfileInResource(resourceType, profile._id, resourceId);
      const currentDashboard = dashboards[0];

      // Updating session
      const newResourceConfig: ISessionResource = {
        _id: resourceId,
        dashboard: {
          type: resourceType,
          activeId: currentDashboard._id,
        },
      };

      if (resources.find((x) => x._id == resourceId)) {
        resources[resources.findIndex((x) => x._id == resourceId)] = newResourceConfig; 
      } else {
        resources.push(newResourceConfig);
      };

      req.session.resources = resources;

      return currentDashboard;
    };
  };

  // mutation SetCurrentDashboard
  @UseGuards(UserAuthGuard)
  @Mutation(returns => DashboardConfigObject, {
    name: 'SetCurrentDashboard'
  })
  public async setCurrentDashboard(
    @Args('resourceId') resourceId: string,
    @Args('dashboardId') dashboardId: string,

    @Context('user') profile: Profile,
    @Context('req') req: IRequest,
  ): Promise<DashboardConfig> {
    const resources = req.session.resources ?? [];

    // Fetching this dashboard
    const dashboard = await this.service.fetchById(dashboardId);
    if (!dashboard) throw new HttpException(`Dashboard not found`, HttpStatus.NOT_FOUND);

    // Creating new resource config object
    const newResourceConfig: ISessionResource = {
      _id: resourceId,
      dashboard: {
        type: dashboard.type,
        activeId: dashboardId,
      },
    };

    // Updating this object in resources field
    if (resources.find((x) => x._id == resourceId)) {
      resources[resources.findIndex((x) => x._id == resourceId)] = newResourceConfig;
    } else {
      resources.push(newResourceConfig);
    };

    // Updating session
    req.session.resources = resources;
    return dashboard;
  };
};