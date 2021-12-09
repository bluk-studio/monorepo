import { gql } from '@apollo/client/core/core.cjs.js';
import type { IExecutionResult, IProjectDashboardConfig } from '@app/shared';
import { AllDashboardWidgets } from 'src/queries/Project/Dashboard/Widgets';

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
      ${AllDashboardWidgets}
    }
  }
`;