import { Types } from "mongoose";
import { IMarketplaceInformation } from ".";

// Exporting IBasePluginResource interface
export interface IBasePluginResource {
  _id: Types.ObjectId;
  
  // Visual information of this plugin
  title: string;
  description?: string;

  // Marketplace-related information
  marketplace: IMarketplaceInformation

  // Id of this plugin's creator
  creatorId: Types.ObjectId;
  
  projectId?: Types.ObjectId;
};