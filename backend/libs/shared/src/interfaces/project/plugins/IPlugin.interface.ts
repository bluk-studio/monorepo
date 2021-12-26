import { IProfile } from '../..';
import { IPluginNode } from './nodes';

// Exporting IPlugin interface
export interface IPlugin {
  // Technical
  public: boolean;
  creator: IProfile;
  nodes: IPluginNode[],
  // flow: string[],

  // Visual
  name: string;
  description?: string;
};