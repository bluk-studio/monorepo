import { EPermission } from '@app/shared';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { Profile, ProjectSettings, UpdateServerSettingsInput } from 'src/types';
import { ProjectService } from '..';
import { PermissionsService } from '../Permissions';

@Injectable()
export class ServerSettingsService {
  constructor(
    private readonly projectService: ProjectService,
    private readonly permissionsService: PermissionsService,
  ) {}

  // public update
  public async update(
    projectId: string | Types.ObjectId,
    input: UpdateServerSettingsInput,
    profile: Profile,
  ): Promise<ProjectSettings> {
    // Getting project's members
    const members = await this.projectService.fetchMembers(projectId);

    // Getting this member (profile) from this project
    const member = members.find((member) => String(member.uid) == String(profile._id));
    if (!member) {
      // This profile isn't a member of this project
      throw new HttpException(`This profile (_id: ${profile._id}) isn't member of this project (_id: ${projectId})`, HttpStatus.FORBIDDEN);
    } else {
      // Checking permissions
      const permissions = this.permissionsService.createForPermissions(member.permissions?.list ?? []);

      if (!permissions.has(EPermission.UPDATE_SERVER_SETTINGS)) {
        throw new HttpException(`This profile (_id: ${profile._id}) doesn't have ${EPermission.UPDATE_SERVER_SETTINGS} permission`, HttpStatus.FORBIDDEN);
      } else {
        // Getting project and updating
        // it's ServerSettings property
        const project = await this.projectService.fetchById(projectId);

        if (!project) throw new HttpException(`Project with _id ${projectId} not found`, HttpStatus.NOT_FOUND);

        // Updating
        if (input.whitelist != null) project.settings.server.whitelist = input.whitelist;
        if (input.onlineMode != null) project.settings.server.onlineMode = input.onlineMode;
        if (input.address != null) project.settings.server.address = input.address;
    

        await project.updateOne(project);
        return project.settings;
      };
    };
  };
};