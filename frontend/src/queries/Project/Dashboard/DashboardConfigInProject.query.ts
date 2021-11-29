import { gql } from '@apollo/client/core/core.cjs.js';
import type { IExecutionResult, IProjectDashboardConfig } from '@app/shared';

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