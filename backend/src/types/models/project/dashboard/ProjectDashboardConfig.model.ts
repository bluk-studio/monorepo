import { IDashboardWidget, IProjectDashboardConfig } from '@app/shared';
import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ProjectDashboardConfigDocument = Document & ProjectDashboardConfig;

@Schema()
export class ProjectDashboardConfig implements Omit<IProjectDashboardConfig, '_id'> {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: Types.ObjectId, ref: 'Project', required: true })
  pid: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Profile', required: true })
  uid: Types.ObjectId;

  @Prop({ type: Array, required: true, default: [] })
  widgets: IDashboardWidget[]
};

export const ProjectDashboardConfigSchema = SchemaFactory.createForClass(ProjectDashboardConfig);