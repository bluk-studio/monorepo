import { IDashboardWidget, IDashboardConfig, EDashboardType } from '@app/shared';
import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type DashboardConfigDocument = Document & DashboardConfig;

@Schema()
export class DashboardConfig implements Omit<IDashboardConfig, '_id'> {
  _id: Types.ObjectId;
  
  @Prop({ type: String, enum: Object.keys(EDashboardType), required: true })
  type: EDashboardType;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: Types.ObjectId, required: true })
  rid: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Profile', required: true })
  uid: Types.ObjectId;

  @Prop({ type: Array, required: true, default: [] })
  widgets: IDashboardWidget[]
};

export const DashboardConfigSchema = SchemaFactory.createForClass(DashboardConfig);