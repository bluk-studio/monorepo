import { EMemberRole, EPermission, IMemberPermission } from '@app/shared';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ProjectMember, ProjectMemberDocument } from 'src/types';

@Injectable()
export class ProjectMemberService {
  constructor(
    @InjectModel('ProjectMember')
    private readonly projectMemberModel: Model<ProjectMemberDocument>,
  ) {}

  // public fetchProjectMembers
  public async fetchProjectMembers(
    projectId: string | Types.ObjectId,
  ): Promise<Array<ProjectMember>> {
    const _id = 
      projectId instanceof Types.ObjectId
        ? projectId
        : new Types.ObjectId(projectId);

    // Fetching members
    const members = await this.projectMemberModel.find({ pid: _id });
    
    // +todo remove this
    const serializedMembers = members.map((member) => {
      if (member.role == EMemberRole.OWNER) {
        member.permissions = {
          list: Object.keys(EPermission).map((permission) => {
            return {
              permission: permission as EPermission
            }
          }),
        };
      };

      return member;
    });

    return serializedMembers;
  }

  // public assignMemberToProject
  public async assignMemberToProject(
    projectId: string | Types.ObjectId,
    profileId: string | Types.ObjectId,
    role: EMemberRole,
    permissions?: Array<IMemberPermission>,
  ) {
    const _projectId: Types.ObjectId =
      projectId instanceof Types.ObjectId
        ? projectId
        : new Types.ObjectId(projectId);

    const _profileId: Types.ObjectId =
      profileId instanceof Types.ObjectId
        ? profileId
        : new Types.ObjectId(profileId);

    // Creating new ProjectMember
    const projectMember = await new this.projectMemberModel({
      pid: _projectId,
      uid: _profileId,
      role,
      permissions,
    }).save();
    return projectMember;
  }
}
