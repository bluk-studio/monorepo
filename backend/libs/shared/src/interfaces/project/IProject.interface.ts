import { IProjectMember } from './members';
import { Types } from 'mongoose';

// Exporting IProject interface
export interface IProject {
  _id: Types.ObjectId;

  // Common project properties
  name: string;
  description?: string;

  // Technical properties
  members: Array<IProjectMember>;
}
