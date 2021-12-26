import { IRawPlugin } from '@app/shared';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// Exporting RawPluginDocument type
export type RawPluginDocument = RawPlugin & Document;

// Exporting RawPlugin schema information
@Schema()
export class RawPlugin implements IRawPlugin {
  
};

// Exporting RawPlugin schema
export const RawPluginSchema = SchemaFactory.createForClass(RawPlugin);