import { IProject } from '@app/shared';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ProjectMember } from '.';

export type ProjectDocument = Document & Project;

@Schema()
export class Project implements IProject {
  _id: Types.ObjectId;

  @Prop({ required: true, unique: false })
  name: string;

  @Prop({ required: false, unique: false })
  description?: string;

  members: Array<ProjectMember>;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
