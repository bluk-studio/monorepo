import { EPermission } from '../../../';
import { Types } from 'mongoose';

// Exporting IMemberPermission interface
export interface IMemberPermission {
  permission: EPermission;
  issuerId?: Types.ObjectId;
}

// Exporting IMemberPermissions interface
export interface IMemberPermissions {
  lastModified?: number;
  list?: Array<IMemberPermission>;
}
