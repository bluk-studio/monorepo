import { gql } from '@apollo/client/core/core.cjs.js';
import type { IExecutionResult, IProjectDashboardConfig } from '@app/shared';

// Exporting interface
interface IUpdateProjectDashboardData {
  UpdateProjectDashboard: IProjectDashboardConfig,
};

export type IUpdateProjectDashboardResponse = IExecutionResult<IUpdateProjectDashboardData>;

// Exporting UpdateProjectDashboard
export const UpdateProjectDashboard = gql`
  mutation UpdateProjectDashboard(
    $dashboardId: String!
    $input: UpdateDashboardConfigInput!
  ) {
    UpdateProjectDashboard(
      dashboardId: $dashboardId
      input: $input
    ) {
      _id
      name
    }
  }
`;
