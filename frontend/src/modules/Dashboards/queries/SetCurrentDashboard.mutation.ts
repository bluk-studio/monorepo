// Importing modules
import { gql } from '@apollo/client/core/core.cjs.js';
import type { IDashboardConfig } from '@app/shared';

// Exporting ISetCurrentDashboardData
export interface ISetCurrentDashboardData {
  SetCurrentDashboard: Pick<IDashboardConfig, '_id'>
};

// Exporting SetCurrentDashboard query as function
export const SetCurrentDashboard = () => {
  return gql`
    mutation SetCurrentDashboard(
      $resourceId: String!
      $dashboardId: String!
    ) {
      SetCurrentDashboard(resourceId: $resourceId, dashboardId: $dashboardId) {
        _id
      }
    }
  `;
};