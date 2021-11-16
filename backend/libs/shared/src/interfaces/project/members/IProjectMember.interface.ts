import { EMemberRole } from '../../../';
import { IMemberPermissions } from '.';
import { Types } from 'mongoose';

// Exporting IProjectMember interface
export interface IProjectMember {
  _id: Types.ObjectId;

  pid: Types.ObjectId;
  uid: Types.ObjectId;
  role: EMemberRole;
  permissions?: IMemberPermissions;
}
