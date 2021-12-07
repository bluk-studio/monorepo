import { gql } from '@apollo/client/core/core.cjs.js';
import type { IExecutionResult, IProject } from '@app/shared';

// Exporting IUpdateWhitelistMutationResponse interface
interface IUpdateWhitelistMutationData {
  UpdateServerSettings: {
    server: {
      whitelist: boolean,
    }
  },
};

export type IUpdateWhitelistMutationResponse = IExecutionResult<IUpdateWhitelistMutationData>;

// Exporting UpdateWhitelist
export const UpdateWhitelist = gql`
  mutation UpdateWhitelist(
    $projectId: String!
    $value: Boolean!
  ) {
    UpdateServerSettings(
      projectId: $projectId,
      input: {
        whitelist: $value
      }
    ) {
      server {
        whitelist
      }
    }
  }
`;
