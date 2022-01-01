import { EPluginType } from "@app/shared";
import { Types } from "mongoose";

export interface IProjectPlugin {
  type: EPluginType,
  id: Types.ObjectId,
};