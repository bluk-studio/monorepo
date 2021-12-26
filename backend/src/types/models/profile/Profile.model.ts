import { IProfile } from '@app/shared';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ProfileDocument = Document & Profile;

@Schema()
export class Profile implements Omit<IProfile, 'projects'> {
  _id: Types.ObjectId;

  @Prop({ required: true, unique: true })
  email: string;

  // +todo remove
  token?: string;

  @Prop({ required: false, unique: false })
  username?: string;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
