import { EPermission, EPluginType } from '@app/shared';
import { HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { UserAuthGuard } from 'src/guards';
import { ProfileService } from 'src/modules/Profile/services';
import { PermissionsService, ProjectMemberService } from 'src/modules/Project/services';
import { PluginCreateInput, Profile, ProfileObject, RawPluginDocument, RawPluginObject, ProjectObject, Project } from 'src/types';
import { BasicPluginService } from '../../../Basic/services';
import { RawPluginService } from '../services';
import { ProjectService } from 'src/modules/Project/services';

@Resolver(of => RawPluginObject)
export class RawPluginResolver {
  constructor(
    private readonly service: RawPluginService,

    private readonly projectService: ProjectService,
    private readonly membersService: ProjectMemberService,
    private readonly permissionsService: PermissionsService,
    private readonly profileService: ProfileService,
    private readonly basicPluginService: BasicPluginService,
  ) {}
  
  // resolve creator field
  @ResolveField('creator', (returns) => ProfileObject)
  public async resolveCreatorField(
    @Parent() plugin: RawPluginDocument,
  ): Promise<Profile> {
    return await this.profileService.fetchById(plugin.creatorId);
  };

  // resolve project field
  @ResolveField('project', (returns) => ProjectObject, { nullable: true })
  public async resolveProjectField(
    @Parent() plugin: RawPluginDocument,
  ): Promise<Project | Object> {
    if (plugin.projectId != null) {
      return await this.projectService.fetchById(plugin.projectId) ?? {};
    };
  };

  // query RawPluginById
  @Query(returns => RawPluginObject, {
    name: 'RawPluginById'
  })
  public async fetchById(
    @Args('pluginId') pluginId: string,
  ): Promise<RawPluginDocument> {
    return await this.service.fetchById(pluginId);
  };

  // query RawPluginsByProfile
  @UseGuards(UserAuthGuard)
  @Query(returns => [RawPluginObject], {
    name: 'RawPluginsByProfile',
  })
  public async fetchByProfile(
    @Context('user') profile: Profile,

    @Args('includeProjectPlugins', { nullable: true }) includeProjectPlugins?: boolean,
  ): Promise<RawPluginDocument[]> {
    return await this.service.fetchByProfile(profile._id, includeProjectPlugins);
  };

  // query RawPluginsByProject
  @UseGuards(UserAuthGuard)
  @Query(returns => [RawPluginObject], {
    name: 'RawPluginsByProject'
  })
  public async fetchByProject(
    @Args('projectId') projectId: string,

    @Context('user') profile: Profile,
  ): Promise<RawPluginDocument[]> {
    // Fetching information about this project
    const members = await this.membersService.fetchProjectMembers(projectId);
    const member = members.find((member) => String(member.uid) == String(profile._id));

    if (!member) throw new HttpException('You do not belong to this project', HttpStatus.UNAUTHORIZED);

    // Checking member permissions
    const permissions = await this.permissionsService.createForPermissions(member.permissions?.list ?? []);
    if (!permissions.has(EPermission.FETCH_RAW_PLUGINS)) throw new HttpException('You do not have access to view RawPlugins in this project', HttpStatus.FORBIDDEN);

    // Returning
    return await this.service.fetchByProject(projectId);
  };

  // mutation CreateRawPlugin
  @UseGuards(UserAuthGuard)
  @Mutation(returns => RawPluginObject, {
    name: 'CreateRawPlugin'
  })
  public async createRawPlugin(
    @Context('user') profile: Profile,

    // Input
    @Args('input') input: PluginCreateInput,

    // Settings
    @Args('addToProject', { nullable: true }) addToProject?: string,
  ): Promise<RawPluginDocument> {
    // Creating new plugin
    const plugin = await this.service.create(input, profile._id);

    // Adding this plugin to project (if needed)
    if (addToProject) {
      await this.basicPluginService.addPluginToProject(addToProject, { type: EPluginType.RAW_PLUGIN, id: plugin._id });
    };

    return plugin;
  };

  // update UpdateRawPlugin
};