import { Types } from "mongoose";
import { EDashboardType } from "../../enums/dashboard";
import { IDashboardWidget } from "./widgets";

// Exporting IDashboardConfig interface
export interface IDashboardConfig {
  _id: Types.ObjectId;
  
  type: EDashboardType;
  name: string;

  uid: Types.ObjectId;

  widgets: IDashboardWidget[];
};