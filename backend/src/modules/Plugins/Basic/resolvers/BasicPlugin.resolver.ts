import { EPermission, EPluginType } from '@app/shared';
import { HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { Profile, Project, ProjectObject } from 'src/types';
import { UserAuthGuard } from 'src/guards';

import { PermissionsService, ProjectService } from 'src/modules/Project/services';
import { BasicPluginService } from '../services';

@Resolver(of => ProjectObject)
export class BasicPluginResolver {
  constructor(
    private readonly service: BasicPluginService,

    private readonly projectService: ProjectService,
    private readonly permissionsService: PermissionsService,
  ) {}

  // mutation AddPluginToProject
  @UseGuards(UserAuthGuard)
  @Mutation(returns => ProjectObject, {
    name: 'AddPluginToProject'
  }) 
  public async addPluginToProject(
    @Context('user') profile: Profile,

    // Arguments
    @Args('projectId') projectId: string,

    @Args('pluginType', { type: () => EPluginType }) pluginType: EPluginType,
    @Args('pluginId') pluginId: string,
  ): Promise<Project> {
    // Fetching this member in this project
    const members = await this.projectService.fetchMembers(projectId);

    const member = members.find((member) => String(member.uid) == String(profile._id));
    if (!member) throw new HttpException('You do not belong to this project', HttpStatus.FORBIDDEN);

    // Checking his permissions
    const permissions = this.permissionsService.createForPermissions(member.permissions?.list ?? []);
    if (!permissions.has(EPermission.ADD_PLUGIN_TO_PROJECT)) throw new HttpException('You do not have enough permissions', HttpStatus.FORBIDDEN);

    // Adding this plugin to this project's 
    return await this.service.addPluginToProject(projectId, { type: pluginType, id: pluginId });
  };
};