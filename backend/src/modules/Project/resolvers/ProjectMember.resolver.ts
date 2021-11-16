import { Resolver, ResolveField, Parent } from '@nestjs/graphql';
import { ProfileService } from 'src/modules/Profile/services';
import {
  MemberPermissionsObject,
  ProfileObject,
  ProjectMember,
  ProjectMemberObject,
} from 'src/types';

@Resolver((of) => ProjectMemberObject)
export class ProjectMemberResolver {
  constructor(private readonly profileService: ProfileService) {}

  // resolve profile field
  @ResolveField('profile', (type) => ProfileObject)
  public async resolveProfile(@Parent() member: ProjectMember) {
    return await this.profileService.fetchById(member.uid);
  }

  // resolve list field
  @ResolveField('permissions', (type) => MemberPermissionsObject)
  public async resolvePermissions(@Parent() member: ProjectMember) {
    // +todo
    // Auto-fill permissions based on member's role
    return member.permissions ?? {};
  }
}
