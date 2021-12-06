import { gql } from '@apollo/client/core/core.cjs.js';
import type { IExecutionResult, IProject } from '@app/shared';

// Exporting IWhitelistData type
export interface IWhitelistData {
  Project: IProject
};

export type IWhitelistResponse = IExecutionResult<IWhitelistData>;

// Exporting query itself
export const Whitelist = gql`
  query Whitelist($projectId: String!) {
    Project(projectId: $projectId) {
      settings {
        server {
          whitelist
        }
      }
    }
  }
`;
