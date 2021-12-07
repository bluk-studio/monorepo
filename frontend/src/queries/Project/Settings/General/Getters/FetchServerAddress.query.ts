import { gql } from '@apollo/client/core/core.cjs.js';
import type { IExecutionResult, IProject } from '@app/shared';

// Exporting FetchServerAddressData type
export interface IFetchServerAddressData {
  Project: {
    settings: {
      server: {
        address: string,
      }
    }
  }
};

export type IFetchServerAddressResponse = IExecutionResult<IFetchServerAddressData>;

// Exporting query itself
export const FetchServerAddress = gql`
  query FetchServerAddress($projectId: String!) {
    Project(projectId: $projectId) {
      settings {
        server {
          address
        }
      }
    }
  }
`;
