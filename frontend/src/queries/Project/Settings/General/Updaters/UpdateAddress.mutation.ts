import { gql } from '@apollo/client/core/core.cjs.js';
import type { IExecutionResult, IProject } from '@app/shared';

// Exporting IUpdateServerAddressMutationResponse interface
interface IUpdateServerAddressMutationData {
  UpdateServerSettings: {
    server: {
      address: string,
    }
  },
};

export type IUpdateServerAddressMutationResponse = IExecutionResult<IUpdateServerAddressMutationData>;

// Exporting UpdateServerAddress
export const UpdateServerAddress = gql`
  mutation UpdateServerAddress($projectId: String!, $value: String!) {
    UpdateServerSettings(
      projectId: $projectId,
      input: {
        address: $value
      }
    ) {
      server {
        address
      }
    }
  }
`;
