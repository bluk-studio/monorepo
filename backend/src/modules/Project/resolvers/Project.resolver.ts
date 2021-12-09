import {
  Resolver,
  Query,
  Args,
  ResolveField,
  Parent,
  Mutation,
  Context,
} from '@nestjs/graphql';
import {
  CreateProjectInput,
  Profile,
  ProjectMemberObject,
  ProjectObject,
} from 'src/types';
import { ProjectService } from 'src/modules/Project/services';
import { UseGuards } from '@nestjs/common';
import { UserAuthGuard } from 'src/guards';

@Resolver((of) => ProjectObject)
export class ProjectResolver {
  constructor(private readonly projectService: ProjectService) {}

  // query project by id
  @Query((type) => ProjectObject, {
    name: 'Project',
    description: "Get Project instance from Project's id",
  })
  public async queryProject(@Args('projectId') projectId: string) {
    // Fetching project by this id
    return this.projectService.fetchById(projectId);
  }

  // query profileProjects
  @UseGuards(UserAuthGuard)
  @Query((type) => [ProjectObject], {
    name: 'ProfileProjects',
    description: "Fetch all ProjectObject's of a current profile",
  })
  public async queryProfileProjects(
    @Context('user') user: Profile,
  ): Promise<Array<ProjectObject>> {
    return await this.projectService.fetchProfileProjects(user._id);
  }

  // mutation CreateProject
  @UseGuards(UserAuthGuard)
  @Mutation((returns) => ProjectObject, {
    name: 'CreateProject',
    description: 'Create new project using data passed into CreateProjectInput',
  })
  public async createProject(
    @Args('input') input: CreateProjectInput,
    @Context('user') profile: Profile,
  ) {
    // Creating new project using data passed into CreateProjectInput
    return this.projectService.createProject(input, profile);
  }

  // mutation deleteProject
  @UseGuards(UserAuthGuard)
  @Mutation((returns) => ProjectObject, {
    name: 'DeleteProject',
    description: "Deletes Project with passed _id and returns it",
  })
  public async deleteProject(
    @Args('projectId') projectId: string,
    @Context('user') profile: Profile
  ) {
    return await this.projectService.delete(projectId, profile);
  };

  // resolve members field
  @ResolveField('members', (type) => [ProjectMemberObject])
  public async resolveMembers(@Parent() project: ProjectObject) {
    return await this.projectService.fetchMembers(String(project._id));
  }
}
