import { EMemberRole } from '@app/shared';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
  CreateProjectInput,
  Profile,
  Project,
  ProjectDocument,
  ProjectMember,
  ProjectMemberDocument,
} from 'src/types';
import { ProjectMemberService } from '.';

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel('Project')
    private readonly projectModel: Model<ProjectDocument>,

    private readonly projectMemberService: ProjectMemberService,
  ) {}

  // public fetchById
  public async fetchById(projectId: string): Promise<Project> {
    const _id = new Types.ObjectId(projectId);

    return await this.projectModel.findOne({ _id });
  }

  // public fetchProfileProjects
  public async fetchProfileProjects(
    profileId: string | Types.ObjectId,
  ): Promise<Array<Project>> {
    const _profileId =
      profileId instanceof Types.ObjectId
        ? profileId
        : new Types.ObjectId(profileId);

    // Fetching projects
    return await this.projectModel.find({ 'members.uid': _profileId });
  }

  // public fetchMembers
  public async fetchMembers(projectId: string): Promise<Array<ProjectMember>> {
    return await this.projectMemberService.fetchProjectMembers(projectId);
  }

  // public createProject
  public async createProject(
    input: CreateProjectInput,
    profile: Profile,
  ): Promise<Project> {
    // Creating project
    const project = await new this.projectModel({
      name: input.name,
      description: input.description,
    }).save();

    // Adding this user to members list of this project
    await this.projectMemberService.assignMemberToProject(
      project._id,
      profile._id,
      EMemberRole.OWNER,
    );

    return project;
  }
}
