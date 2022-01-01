import { IRawPlugin } from '@app/shared';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { MarketplaceInformation } from '..';
import { Document, Types } from 'mongoose';

// Exporting RawPluginDocument type
export type RawPluginDocument = RawPlugin & Document;

// Exporting RawPlugin schema information
@Schema()
export class RawPlugin implements IRawPlugin {
  _id: Types.ObjectId;

  // Visual
  @Prop({ required: true })
  title: string;

  @Prop({ required: false })
  description?: string;

  // Marketplace-related information
  @Prop({ required: true })
  marketplace: MarketplaceInformation;

  // Technical
  @Prop({ required: true })
  code: string[];

  @Prop({ type: Types.ObjectId, ref: 'Profile', required: true })
  creatorId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Project', required: false })
  projectId?: Types.ObjectId;
};

// Exporting RawPlugin schema
export const RawPluginSchema = SchemaFactory.createForClass(RawPlugin);