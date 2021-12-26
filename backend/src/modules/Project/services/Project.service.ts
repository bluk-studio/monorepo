import { EMemberRole, EPermission } from '@app/shared';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
import { PermissionsService, ProjectMemberService } from '.';

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel('Project')
    private readonly projectModel: Model<ProjectDocument>,

    @InjectModel('ProjectMember')
    private readonly projectMemberModel: Model<ProjectMemberDocument>,

    private readonly projectMemberService: ProjectMemberService,
    private readonly permissionsService: PermissionsService,
  ) {}

  // public fetchById
  public async fetchById(projectId: string | Types.ObjectId): Promise<ProjectDocument> {
    const _id = 
      projectId instanceof Types.ObjectId
        ? projectId
        : new Types.ObjectId(projectId);

    return await this._serialize(await this.projectModel.findOne({ _id }));
  };

  // public fetchByAddress
  public async fetchByAddress(address: string): Promise<ProjectDocument> {
    const project = await this.projectModel.findOne({ "settings.server.address": address });
    return await this._serialize(project);
  };

  // public fetchProfileProjects
  public async fetchProfileProjects(
    profileId: string | Types.ObjectId,
  ): Promise<Array<ProjectDocument>> {
    const _profileId =
      profileId instanceof Types.ObjectId
        ? profileId
        : new Types.ObjectId(profileId);

    // Fetching projects
    const projectMemberInstances = await this.projectMemberModel.find({ uid: _profileId });
    const projects: Array<ProjectDocument> = [];
    for (const instance of projectMemberInstances) {
      const project = await this.projectModel.findOne({ _id: instance.pid });

      if (project) projects.push(project);
    };

    // Serializing project object
    const serializedProjects: ProjectDocument[] = [];
    for (const project of projects) {
      serializedProjects.push(await this._serialize(project));
    };

    return serializedProjects;
  };

  // private _serialize
  private async _serialize(project: ProjectDocument): Promise<ProjectDocument> {
    // Checking if this project have server address
    if (!project.settings?.server?.address) {      
      // Generating random address for this project
      const address = this._randomIdentifier(10);
      // +todo wtf is this
      project.settings.server.address = address;

      // Updating project
      const projectDocument = await this.projectModel.findOne({ _id: project._id });
      await projectDocument.updateOne(project);
    };

    return project;
  };

  // public fetchMembers
  public async fetchMembers(projectId: string | Types.ObjectId): Promise<Array<ProjectMember>> {
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

    return await this._serialize(project);
  };

  // public delete
  public async delete(
    projectId: string | Types.ObjectId,
    profile: Profile
  ): Promise<Project> {
    const _projectId =
      projectId instanceof Types.ObjectId
        ? projectId
        : new Types.ObjectId(projectId);

    // Getting project with this id
    const project = await this.fetchById(projectId);
    const members = await this.fetchMembers(projectId);
    if (!project || !members) throw new HttpException(`Project with _id: ${projectId} does not exists.`, HttpStatus.NOT_FOUND);

    // Checking if this project has this Profile
    const member = members.find((x) => String(x.uid) == String(profile._id));
    
    if (!member) throw new HttpException(`This Project (_id: ${projectId}) doesn't have this member (_id: ${profile._id})`, HttpStatus.UNAUTHORIZED);
    const permissions = this.permissionsService.createForPermissions(member.permissions?.list ?? []);

    // Checking if this member has this
    // permission
    if (!permissions.has(EPermission.DELETE_PROJECT)) {
      throw new HttpException(`This member (_id: ${profile._id}) doesn't have ${EPermission.DELETE_PROJECT} permission`, HttpStatus.FORBIDDEN);
    } else {
      // Deleting project
      await project.deleteOne();
    };

    return project;
  };

  // private _randomIdentifier
  // +todo move this to HelperService (probably)
  private _randomIdentifier(length = 12): string {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    };

    return result;
  };
}
