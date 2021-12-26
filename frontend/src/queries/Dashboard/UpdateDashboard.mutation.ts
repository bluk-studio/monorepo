import { gql } from '@apollo/client/core/core.cjs.js';
import type { IExecutionResult, IDashboardConfig } from '@app/shared';

// Exporting interface
interface IUpdateDashboardData {
  UpdateDashboard: IDashboardConfig,
};

export type IUpdateDashboardResponse = IExecutionResult<IUpdateDashboardData>;

// Exporting UpdateProjectDashboard
export const UpdateDashboard = gql`
  mutation UpdateDashboard(
    $dashboardId: String!
    $input: UpdateDashboardConfigInput!
  ) {
    UpdateDashboard(
      dashboardId: $dashboardId
      input: $input
    ) {
      _id
      name
    }
  }
`;
