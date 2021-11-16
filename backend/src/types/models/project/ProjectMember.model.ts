import { EMemberRole, IProjectMember, IMemberPermissions } from '@app/shared';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ProjectMemberDocument = Document & ProjectMember;

@Schema()
export class ProjectMember implements IProjectMember {
  _id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Project', required: true })
  pid: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Profile', required: true })
  uid: Types.ObjectId;

  @Prop({ type: String, enum: Object.keys(EMemberRole), required: true })
  role: EMemberRole;

  @Prop({ type: Object, required: false })
  permissions?: IMemberPermissions;
}

export const ProjectMemberSchema = SchemaFactory.createForClass(ProjectMember);
