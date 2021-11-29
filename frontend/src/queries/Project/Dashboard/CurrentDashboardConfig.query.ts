import { gql } from '@apollo/client/core/core.cjs.js';
import type { IExecutionResult, IProjectDashboardConfig } from '@app/shared';

// Exporting ICurrentDashboardConfig
export interface ICurrentDashboardConfigData {
  CurrentProjectDashboard: IProjectDashboardConfig
};

export type ICurrentDashboardConfigResponse = IExecutionResult<ICurrentDashboardConfigData>;

// Exporting query
export const CurrentDashboardConfig = gql`
  query CurrentDashboardConfig($projectId: String!) {
    CurrentProjectDashboard(projectId: $projectId) {
      _id
      name
      widgets {
        type
        x
        y
        height
        width
      }
    }
  }
`;