import { IBasePluginResource } from "..";

// Exporting IRawPlugin interface
export interface IRawPlugin extends IBasePluginResource {
  code: string;
};