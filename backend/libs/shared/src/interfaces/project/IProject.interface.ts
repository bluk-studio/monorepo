import { IProjectMember } from './members';
import { Types } from 'mongoose';
import { IServerSettings } from './settings';
import { IProjectPlugin } from '.';

// Exporting IProject interface
export interface IProject {
  _id: Types.ObjectId;

  // Common project properties
  name: string;
  description?: string;

  // Project Settings
  settings: {
    server: IServerSettings;
  };

  // Technical properties
  members: Array<IProjectMember>;
}
