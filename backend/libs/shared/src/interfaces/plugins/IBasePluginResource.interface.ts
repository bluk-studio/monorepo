import { Types } from "mongoose";

// Exporting IBasePluginResource interface
export interface IBasePluginResource {
  // Visual information of this plugin
  title: string;
  description?: string;

  // Marketplace-related information
  marketplace: {
    display: boolean
  };

  // Id of this plugin's creator
  creatorId: Types.ObjectId;
};