import { gql } from '@apollo/client/core/core.cjs.js';
import type { IExecutionResult, IProject } from '@app/shared';

// Exporting IDeleteProjectMutationResponse interface
interface IDeleteProjectMutationData {
  CreateProject: IProject,
};

export type IDeleteProjectMutationResponse = IExecutionResult<IDeleteProjectMutationData>;

// Exporting DeleteProject
export const DeleteProject = gql`
  mutation DeleteProject($projectId: String!) {
    DeleteProject(projectId: $projectId) {
      _id
    }
  }
`;