import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { ProjectService } from 'src/modules/Project/services';
import { Profile, ProfileObject, Project, ProjectObject } from 'src/types';

@Resolver((of) => ProfileObject)
export class ProfileResolver {
  constructor(private readonly projectService: ProjectService) {}

  @ResolveField('projects', (returns) => [ProjectObject])
  public async resolveProjects(
    @Parent() profile: Profile,
  ): Promise<Array<Project>> {
    return await this.projectService.fetchProfileProjects(profile._id);
  }
}
