import { IProject, IServerSettings } from '@app/shared';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ProjectSettings, ProjectSettingsSchema } from '.';
import { ProjectMember } from '.';

export type ProjectDocument = Document & Project;

@Schema()
export class Project implements IProject {
  _id: Types.ObjectId;

  @Prop({ required: true, unique: false })
  name: string;

  @Prop({ required: false, unique: false })
  description?: string;

  @Prop({ type: ProjectSettingsSchema, required: true, default: () => {
    // Default project settings
    return {
      server: <IServerSettings>{
        onlineMode: false,
        whitelist: true,
      },
    };
  }})
  settings: ProjectSettings;

  members: Array<ProjectMember>;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
