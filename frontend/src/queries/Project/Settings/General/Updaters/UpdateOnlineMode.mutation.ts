import { gql } from '@apollo/client/core/core.cjs.js';
import type { IExecutionResult, IProject } from '@app/shared';

// Exporting IUpdateOnlineModeMutationResponse interface
interface IUpdateOnlineModeMutationData {
  UpdateServerSettings: {
    server: {
      onlineMode: boolean,
    }
  },
};

export type IUpdateOnlineModeMutationResponse = IExecutionResult<IUpdateOnlineModeMutationData>;

// Exporting UpdateOnlineMode
export const UpdateOnlineMode = gql`
  mutation UpdateOnlineMode(
    $projectId: String!
    $value: Boolean!
  ) {
    UpdateServerSettings(
      projectId: $projectId,
      input: {
        onlineMode: $value
      }
    ) {
      server {
        onlineMode
      }
    }
  }
`;
