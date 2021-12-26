import { EPluginNodeType } from "@app/shared";
import { INodeInput, INodeOutput, INodeCode } from "./components";

// Exporting interface IPluginNode
export interface IPluginNode {
  // Technical
  // type: EPluginNodeType,

  code: INodeCode,
  inputs: INodeInput[],
  outputs: INodeOutput[],

  // +todo
  // Location
  // x: number;
  // y: number;
};