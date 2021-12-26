import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { IServerSettings } from '@app/shared';

@Schema()
export class ServerSettings implements IServerSettings {
  @Prop({ required: true, default: false })
  onlineMode: boolean;

  @Prop({ required: true, default: false })
  whitelist: boolean;

  @Prop({ required: false, unique: true })
  address: string;
};

export const ServerSettingsSchema = SchemaFactory.createForClass(ServerSettings);