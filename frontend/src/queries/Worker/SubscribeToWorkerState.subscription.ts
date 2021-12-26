import { gql } from '@apollo/client/core/core.cjs.js';
import type { IExecutionResult, IWorkerState } from '@app/shared';

// Exporting CurrentWorkerStateResponse type
export interface ICurrentWorkerStateData {
  CurrentWorkerState: IWorkerState
};

export type ICurrentWorkerStateResponse = IExecutionResult<ICurrentWorkerStateData>;

// +todo add more fields (as needed)
// Exporting query itself
export const SubscribeToWorkerState = gql`
  subscription CurrentWorkerState(
    $projectId: String!
    $token: String!  
  ) {
    CurrentWorkerState(
      projectId: $projectId
      token: $token
    ) {
      state
    }
  }
`;
