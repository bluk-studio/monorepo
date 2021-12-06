import { gql } from '@apollo/client/core/core.cjs.js';
import type { IExecutionResult, IProject } from '@app/shared';

// Exporting OnlineModeData type
export interface IOnlineModeData {
  Project: IProject
};

export type IOnlineModeResponse = IExecutionResult<IOnlineModeData>;

// Exporting query itself
export const OnlineMode = gql`
  query OnlineMode($projectId: String!) {
    Project(projectId: $projectId) {
      settings {
        server {
          onlineMode
        }
      }
    }
  }
`;
