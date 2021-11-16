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

  // resolve members field
  @ResolveField('members', (type) => [ProjectMemberObject])
  public async resolveMembers(@Parent() project: ProjectObject) {
    return await this.projectService.fetchMembers(String(project._id));
  }
}
