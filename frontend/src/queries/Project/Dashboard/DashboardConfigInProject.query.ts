import { gql } from '@apollo/client/core/core.cjs.js';
import type { IExecutionResult, IProjectDashboardConfig } from '@app/shared';
import { AllDashboardWidgets } from 'src/queries/Project/Dashboard/Widgets';

// Exporting IDashboardConfigInProject
export interface IDashboardConfigInProject {
  ProjectDashboardByProfile: [IProjectDashboardConfig]
};

export type IDashboardConfigInProjectResponse = IExecutionResult<IDashboardConfigInProject>;

// Exporting query
export const DashboardConfigsInProject = gql`
  query ProjectDashboardByProfile($profileId: String!) {
    ProjectDashboardByProfile(projectId: $projectId) {
      _id
      name
      ${AllDashboardWidgets}
    }
  }
`;