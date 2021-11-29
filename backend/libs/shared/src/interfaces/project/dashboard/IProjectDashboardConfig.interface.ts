import { Types } from "mongoose";
import { IDashboardWidget } from "./widgets";

// Exporting IProjectDashboardConfig interface
export interface IProjectDashboardConfig {
  _id: Types.ObjectId;
  
  name: string;
  pid: Types.ObjectId;
  uid: Types.ObjectId;

  widgets: IDashboardWidget[];
};