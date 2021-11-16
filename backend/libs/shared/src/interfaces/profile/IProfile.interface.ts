import { IProject } from '../';
import { Types } from 'mongoose';

// Exporting IProfile interface
export interface IProfile {
  _id: Types.ObjectId;

  email: string;
  username?: string;

  projects: Array<IProject>;
}
