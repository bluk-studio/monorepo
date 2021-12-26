import { EWorkerState } from "@app/shared";
import { IProject, IPlugin } from "../project";
import { IWorkerRegion } from "./region";

// Exporting IWorkerState interface
export interface IWorkerState {
  // Worker state
  state: EWorkerState;
  region?: IWorkerRegion,

  address?: string,

  // "Interesting" information
  project: IProject,
  plugins: IPlugin[],
};