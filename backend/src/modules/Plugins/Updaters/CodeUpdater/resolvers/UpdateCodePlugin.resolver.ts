import { EPermission } from '@app/shared';
import { HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { Args, Resolver, Mutation, Context } from '@nestjs/graphql';
import { UserAuthGuard } from 'src/guards';
import { RawPluginService } from 'src/modules/Plugins/Types/RawPlugin/services';
import { PermissionsService, ProjectService } from 'src/modules/Project/services';
import { ContentChangeInput } from 'src/types/input';
import { Profile, RawPluginObject } from 'src/types';

@Resolver()
export class UpdateCodePluginResolver {
  constructor(
    private readonly rawPluginService: RawPluginService,
    
    private readonly projectService: ProjectService,
    private readonly permissionService: PermissionsService,
  ) {}

  // mutation UpdateRawPluginCode
  @UseGuards(UserAuthGuard)
  @Mutation((returns) => RawPluginObject, {
    name: 'UpdateRawPluginCode'
  })
  async updateRawPluginCode(
    @Args('pluginId') pluginId: string,
    @Args('changes', { type: () => [ContentChangeInput] }) changes: ContentChangeInput[],

    @Context('user') profile: Profile,
  ) {
    // Fetching plugin information
    const plugin = await this.rawPluginService.fetchById(pluginId);
    if (!plugin) throw new HttpException('Plugin not found', HttpStatus.NOT_FOUND);

    // Checking user permissions
    if (String(plugin.creatorId) != String(profile._id)) {
      if (plugin.projectId == null) throw new HttpException('You do not have access to this resource', HttpStatus.FORBIDDEN);

      const members = await this.projectService.fetchMembers(plugin.projectId);
      const member = members.find((x) => String(x.uid) == String(profile._id));
      if (!member) throw new HttpException('You do not have access to this resource', HttpStatus.FORBIDDEN);

      const permissions = this.permissionService.createForPermissions(member.permissions?.list ?? []);
      if (!permissions.has(EPermission.UPDATE_RAW_PLUGIN_CODE)) throw new HttpException('You do not have access to this resource', HttpStatus.FORBIDDEN);
    };

    // Parsing change information
    let code: string[] = plugin.code;

    changes.forEach((change) => {
      code[change.index] = change.text;
    });
    
    // Removing
    // +todo
    // if (changes.length > 0) {
    //   if (code.length > changes[changes.length - 1].index) {
    //     code = code.filter((value, index) => index <= changes[changes.length - 1].index);
    //   };
    // };

    // Updating plugin code
    await this.rawPluginService.update(plugin._id, { code: code });

    return await this.rawPluginService.fetchById(plugin._id);
  };
};