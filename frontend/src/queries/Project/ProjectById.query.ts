import { gql } from '@apollo/client/core/core.cjs.js';
import type { IExecutionResult, IProject } from '@app/shared';

// Exporting ProjectById type
export interface IProjectByIdData {
  Project: IProject
};

export type IProjectByIdResponse = IExecutionResult<IProjectByIdData>;

// Exporting query itself
export const ProjectById = gql`
  query Project($projectId: String!) {
    Project(projectId: $projectId) {
      _id
      name
      description
    }
  }
`;
