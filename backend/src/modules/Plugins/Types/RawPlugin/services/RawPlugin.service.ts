import { EPermission, EPluginType } from '@app/shared';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ProfileService } from 'src/modules/Profile/services';
import { PermissionsService, ProjectService } from 'src/modules/Project/services';
import { PluginCreateInput, RawPluginDocument, UpdateRawPluginInput } from 'src/types';

@Injectable()
export class RawPluginService {
  constructor(
    @InjectModel('RawPlugin')
    private readonly pluginModel: Model<RawPluginDocument>,

    private readonly projectService: ProjectService,
    private readonly permissionsService: PermissionsService,
    private readonly profileService: ProfileService,
  ) {}

  // public fetchById
  public async fetchById(id: string | Types.ObjectId): Promise<RawPluginDocument> {
    // Converting to ObjectId type
    const _id =
      id instanceof Types.ObjectId
        ? id
        : new Types.ObjectId(id);
    
    // Returning
    return await this.pluginModel.findOne({ _id });
  };

  // public fetchByProfile
  public async fetchByProfile(
    profileId: string | Types.ObjectId,

    includeProjectPlugins = false,
  ): Promise<RawPluginDocument[]> {
    // Converting to ObjectId type
    const _creatorId =
      profileId instanceof Types.ObjectId
        ? profileId
        : new Types.ObjectId(profileId);
    
    // Fetching profile plugins
    const plugins: RawPluginDocument[] = await this.pluginModel.find({ creatorId: _creatorId });
  
    // Fetching all RawPlugins in all profile's projects
    if (includeProjectPlugins) {
      const projects = await this.projectService.fetchProfileProjects(profileId);

      // Looping through all profile projects
      for (const project of projects) {
        const members = await this.projectService.fetchMembers(project._id);
        const member = members.find((member) => String(member.uid) == String(profileId));
        
        if (member) {
          // Checking permissions
          const permissions = this.permissionsService.createForPermissions(member.permissions?.list ?? []);
          
          if (permissions.has(EPermission.FETCH_RAW_PLUGINS)) {
            // Fetching
            plugins.push(...await this.fetchByProject(project._id));
          };
        };
      };
    };

    return plugins;
  };

  // public fetchByProject
  public async fetchByProject(projectId: string | Types.ObjectId): Promise<RawPluginDocument[]> {
    const project = await this.projectService.fetchById(projectId);
    if (!project) throw new HttpException('Project not found', HttpStatus.NOT_FOUND);

    // Fetching
    const plugins = await this.pluginModel.find({ projectId: project._id });

    // Returning
    return plugins;
  };

  // public create
  public async create(
    input: PluginCreateInput,

    profileId: string | Types.ObjectId,
  ): Promise<RawPluginDocument> {
    // Converting profile id to ObjectId type
    const _profileId =
      profileId instanceof Types.ObjectId
        ? profileId
        : new Types.ObjectId(profileId);

    // Fetching this profile
    const profile = await this.profileService.fetchById(_profileId);
    if (!profile) throw new HttpException('Profile not found', HttpStatus.NOT_FOUND);

    // +todo something??

    // Creating new RawPlugin
    const plugin = new this.pluginModel({
      title: input.name,
      description: input.description,

      // Marketplace-information
      marketplace: {
        display: false,
      },

      // Technical
      // - code (default plugin code)
      code: [
        `export default ({ player }) => {`,
        `  // Writing Hello World! message to this player's chat`,
        `  player.respond({`,
        `    message: {`,
        `      text: "Hello world!",`,
        `      bold: true`,
        `    },`,
        `    position: 0,`,
        `    sender: '0'`,
        `  });`,
        `}`
      ],
      creatorId: profile._id,
    });

    return await plugin.save();
  };

  // public update
  public async update(
    pluginId: string | Types.ObjectId,

    input: Partial<UpdateRawPluginInput>,
  ): Promise<RawPluginDocument> {
    // Fetching this plugin
    const plugin = await this.fetchById(pluginId);
    if (!plugin) throw new HttpException('Plugin not found', HttpStatus.NOT_FOUND);

    // Updating
    // - title
    if (input.title) plugin.title = input.title

    // - description
    if (input.description) plugin.description = input.description;

    // - code
    if (input.code) plugin.code = input.code;

    // Updating
    await plugin.updateOne(plugin);
    return plugin;
  };
};