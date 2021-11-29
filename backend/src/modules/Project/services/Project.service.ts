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

    @InjectModel('ProjectMember')
    private readonly projectMemberModel: Model<ProjectMemberDocument>,

    private readonly projectMemberService: ProjectMemberService,
  ) {}

  // public fetchById
  public async fetchById(projectId: string | Types.ObjectId): Promise<Project> {
    const _id = 
      projectId instanceof Types.ObjectId
        ? projectId
        : new Types.ObjectId(projectId);

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
    const projectMemberInstances = await this.projectMemberModel.find({ uid: _profileId });
    const projects: Array<Project> = [];
    for (const instance of projectMemberInstances) {
      const project = await this.projectModel.findOne({ _id: instance.pid });

      if (project) projects.push(project);
    };

    return projects;
  };

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
