import { IBasePluginResource } from "..";

// Exporting IRawPlugin interface
export interface IRawPlugin extends IBasePluginResource {
  __typename?: string;

  code: string[];
};