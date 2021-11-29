import { Args, Context, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { CreateDashboardConfigInput, Profile, ProfileObject, Project, ProjectDashboardConfig, ProjectDashboardConfigObject, ProjectObject, UpdateDashboardConfigInput } from 'src/types';
import { ProjectDashboardService, ProjectService } from 'src/modules/Project/services';
import { HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { UserAuthGuard } from 'src/guards';
import { ProfileService } from 'src/modules/Profile/services';

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
};