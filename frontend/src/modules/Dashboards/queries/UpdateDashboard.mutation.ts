// Importing modules
import { gql } from '@apollo/client/core/core.cjs.js';
import type { IDashboardConfig } from '@app/shared';

// Exporting IUpdateDashboardData interface
export interface IUpdateDashboardData {
  UpdateDashboard: Pick<IDashboardConfig, '_id' | 'name'>,
};

// Exporting our query as function
export const UpdateDashboard = () => {
  return gql`
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
};