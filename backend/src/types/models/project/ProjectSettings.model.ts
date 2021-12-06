import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { ServerSettings, ServerSettingsSchema } from './settings';

@Schema()
export class ProjectSettings {
  @Prop({ type: ServerSettingsSchema, required: true })
  server: ServerSettings
};

export const ProjectSettingsSchema = SchemaFactory.createForClass(ProjectSettings);