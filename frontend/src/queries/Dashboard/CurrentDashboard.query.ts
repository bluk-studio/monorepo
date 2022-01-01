import { gql } from '@apollo/client/core/core.cjs.js';
import type { IExecutionResult, IDashboardConfig } from '@app/shared';

// Exporting ICurrentDashboardConfig
export interface ICurrentDashboardConfigData {
  CurrentDashboard: IDashboardConfig
};

export type ICurrentDashboardConfigResponse = IExecutionResult<ICurrentDashboardConfigData>;

// Exporting query
export const CurrentDashboardConfig = (...widgets) => {
  return gql`
    query CurrentDashboardConfig($resourceId: String!, $dashboardType: EDashboardType!) {
      CurrentDashboard(resourceId: $resourceId, dashboardType: $dashboardType) {
        _id
        name
        widgets {
          __typename
          ${widgets.join('')}
        }
      }
    }
  `;
};