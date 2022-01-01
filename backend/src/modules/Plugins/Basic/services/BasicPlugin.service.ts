import { EPluginType } from '@app/shared';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { Project, RawPluginDocument } from 'src/types';

import { ProjectService } from 'src/modules/Project/services';
import { RawPluginService } from 'src/modules/Plugins/Types/RawPlugin/services';

@Injectable()
export class BasicPluginService {
  constructor(
    private readonly projectService: ProjectService,

    // Plugin's services
    private readonly rawPluginService: RawPluginService,
  ) {}

  // public addPluginToProject
  public async addPluginToProject(
    projectId: string | Types.ObjectId,

    plugin: {
      type: EPluginType,
      id: string | Types.ObjectId,
    },
  ): Promise<Project> {
    // Fetching project
    const project = await this.projectService.fetchById(projectId);
    if (!project) throw new HttpException('Project not found', HttpStatus.NOT_FOUND);

    // Fetching plugin
    let fetchedPlugin: RawPluginDocument;

    switch (plugin.type) {
      case EPluginType.RAW_PLUGIN:
        fetchedPlugin = await this.rawPluginService.fetchById(plugin.id);    
        break;
    };

    if (!fetchedPlugin) throw new HttpException('Plugin not found', HttpStatus.NOT_FOUND);

    fetchedPlugin.projectId = project._id;

    // Updating
    await fetchedPlugin.updateOne(fetchedPlugin);
    return project;
  };
};